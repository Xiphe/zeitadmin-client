import ZeitadminClient from '../src/ZeitadminClient';
import * as PouchDB from 'pouchdb';
import * as MemodyAdapter from 'pouchdb-adapter-memory';

PouchDB.plugin(MemodyAdapter);

describe('client.subscribe', () => {
  let client: ZeitadminClient = null;
  let db = null;
  let i = 0;

  beforeEach(() => {
    db = new PouchDB(`client.subscribe.${i++}`, {adapter: 'memory'});

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

  it('calles the given subscription with state', (done) => {
    client.subscribe((state) => {
      expect(state.zeit.length).toBe(0);
      done();
    });

    client.store.dispatch({ type: 'FOO' });
  });
});
