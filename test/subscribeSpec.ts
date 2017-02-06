import ZeitadminClient from '../src/ZeitadminClient';
import * as PouchDB from 'pouchdb';
import * as MemodyAdapter from 'pouchdb-adapter-memory';

PouchDB.plugin(MemodyAdapter);

describe('client.subscribe', () => {
  let client: ZeitadminClient = null;
  let db = null;

  beforeEach(() => {
    db = new PouchDB('testDb', {adapter: 'memory'});

    client = new ZeitadminClient({
      db,
      token: 'foo',
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
