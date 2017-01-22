import ZeitadminClient from '../src/ZeitadminClient';
import errorMatching from './helpers/errorMatching';
import date from '../src/acl/date';
import uuid from '../src/acl/uuid';

const ONE_SECOND = 1000;
const VALID_ISSUE_URL = 'Xiphe/zeitadmin-client#1';

describe('client.start', () => {
  let client: ZeitadminClient = null;
  let fakeDb = null;
  let validConfig = null;

  beforeEach(() => {
    fakeDb = jasmine.createSpyObj('db', ['get', 'put']);

    fakeDb.put.and.callFake((doc, cb) => { cb(null, {}) });

    validConfig = {
      duration: ONE_SECOND + 1,
    };

    client = new ZeitadminClient({
      db: fakeDb,
      token: 'foo',
    });
  });

  it('throws when called with unparsable issueUrl', (done) => {
    const invalidIssueUrls = [
      'foobar',
      'Xiphe/zeitadmin-client',
      'zeitadmin-client#1',
      'http://example.org/issues/4',
      'https://github.com/Xiphe/zeitadmin-client/blob/master/package.json'
    ]

    invalidIssueUrls.forEach((invalidIssueUrl, i) => {
      client
        .start(invalidIssueUrl, validConfig)
        .then(() => done.fail('unexpected success'))
        .catch((err) => {
          expect(err.message).toContain(`Could not parse issue "${invalidIssueUrl}"`);

          if (i === invalidIssueUrls.length - 1) {
            done();
          }
        });
    });
  });

  it('fails when trying to track less than one second', (done) => {
    const invalidConfig = {
      ...validConfig,
      duration: ONE_SECOND,
    };

    client
      .start(VALID_ISSUE_URL, invalidConfig)
      .then(() => done.fail('unexpected success'))
      .catch((err) => {
        expect(err.message).toContain(`Can not create zeit with duration of ${ONE_SECOND}`);

        done();
      });
  });

  describe('with mocked time and uuid', () => {
    const fakeTime = 123456789;
    const fakeId = 'asdf-21';

    beforeEach(() => {
      spyOn(date, 'getTime').and.returnValue(fakeTime);
      spyOn(uuid, 'create').and.returnValue(fakeId);
    });

    it('fails when zeit can not be written to db', (done) => {
      const someError = new Error();
      fakeDb.put.and.callFake((doc, cb) => { cb(someError, {}) });

      client
        .start(VALID_ISSUE_URL, validConfig)
        .then(() => done.fail('unexpected success'))
        .catch((err) => {
          expect(err.message).toContain(`unable to start zeit`);

          done();
        });
    });

    it('puts a new zeit into db', (done) => {
      client.start(VALID_ISSUE_URL, validConfig)
        .then(() => {
          expect(fakeDb.put).toHaveBeenCalledWith(jasmine.objectContaining({
            _id: fakeId,
            issue: {
              owner: 'Xiphe',
              repo: 'zeitadmin-client',
              number: '1',
            },
            duration: validConfig.duration,
            start: fakeTime,
            end: fakeTime + 1001,
          }), jasmine.any(Function));

          done();
        }, () => done.fail('unexpected failure'));
    });
  });
});
