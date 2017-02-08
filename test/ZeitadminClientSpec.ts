import ZeitadminClient from '../src';
import errorMatching from './helpers/errorMatching';
import date from '../src/acl/date';
import uuid from '../src/acl/uuid';
import * as PouchDB from 'pouchdb';
import * as MemodyAdapter from 'pouchdb-adapter-memory';

PouchDB.plugin(MemodyAdapter);

const ONE_SECOND = 1000;
const VALID_ISSUE_URL = 'Xiphe/zeitadmin-client#1';

describe('ZeitadminClient', () => {
  let client: ZeitadminClient = null;
  let db = null;
  let validConfig = null;
  let i = 0;

  beforeEach(() => {
    db = new PouchDB(`ZeitadminClient${i++}`, {adapter: 'memory'});

    validConfig = {
      duration: ONE_SECOND + 1,
    };

    client = new ZeitadminClient({
      db,
      token: 'foo',
      errorHandler(err) {
        if (err) {
          fail(err);
        }
      },
    });
  });

  describe('#start', () => {
    it('throws when called with unparsable issueUrl', () => {
      const invalidIssueUrls = [
        'foobar',
        'Xiphe/zeitadmin-client',
        'zeitadmin-client#1',
        'http://example.org/issues/4',
        'https://github.com/Xiphe/zeitadmin-client/blob/master/package.json'
      ]

      invalidIssueUrls.forEach((invalidIssueUrl, i) => {
        expect(() => {
          client.start(invalidIssueUrl, validConfig)
        }).toThrow(errorMatching(`Could not parse issue "${invalidIssueUrl}"`));
      });
    });

    it('fails when trying to track less than one second', () => {
      const invalidConfig = {
        ...validConfig,
        duration: ONE_SECOND,
      };

      expect(() => {
        client.start(VALID_ISSUE_URL, invalidConfig);
      }).toThrow(errorMatching(`Can not create zeit with duration of ${ONE_SECOND}`))
    });

    describe('with mocked time and uuid', () => {
      const fakeTime = 123456789;
      const fakeId = 'asdf-21';

      beforeEach(() => {
        spyOn(date, 'getTime').and.returnValue(fakeTime);
        spyOn(uuid, 'create').and.returnValue(fakeId);
      });

      it('fails when zeit can not be written to db', () => {
        const errorHandler = jasmine.createSpy('errorHandler');
        client = new ZeitadminClient({
          db,
          token: 'foo',
          errorHandler,
        });
        const someError = new Error();
        spyOn(db, 'put').and.callFake((opts, cb) => { cb(someError); });

        client.start(VALID_ISSUE_URL, validConfig);

        expect(errorHandler).toHaveBeenCalledWith(
          someError,
          jasmine.objectContaining({
            doc: jasmine.objectContaining({
              _id: jasmine.any(String),
              issue: {
                owner: 'Xiphe',
                repo: 'zeitadmin-client',
                number: '1',
              }
            })
          }),
          jasmine.any(Function)
        );
      });

      it('puts a new zeit into db', (done) => {
        client.start(VALID_ISSUE_URL, validConfig);

        db.allDocs({include_docs: true})
          .then((allDocs) => {
            expect(allDocs.total_rows).toBe(1);
            expect(allDocs.rows[0].doc).toEqual(jasmine.objectContaining({
              _id: fakeId,
              issue: {
                owner: 'Xiphe',
                repo: 'zeitadmin-client',
                number: '1',
              },
              duration: validConfig.duration,
              start: fakeTime,
              end: fakeTime + 1001,
            }));
            done();
          })
          .catch(() => done.fail('unexpected failure'));
      });
    });
  });

  describe('#subscribe', () => {
    it('calles the given subscription with state', (done) => {
      client.subscribe((state) => {
        expect(state.zeit.length).toBe(0);
        done();
      });
    });
  });
});
