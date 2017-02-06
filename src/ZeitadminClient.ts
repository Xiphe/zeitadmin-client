import ZeitDatabaseInterface from './interfaces/ZeitDatabaseInterface';
import ZeitadminClientConfigInterface from './interfaces/ZeitadminClientConfigInterface';
import parseIssueUrl from './parseIssueUrl';
import Zeit from './Zeit';
import { createStore, Store } from 'redux'

interface State {
  zeit: Array<Zeit>
}

const initialState: State = {
  zeit: []
};

export default class ZeitadminClient {
  db: ZeitDatabaseInterface;
  token: string;
  store: Store<State>;
  constructor({ db, token }: ZeitadminClientConfigInterface) {
    this.db = db;
    this.token = token;
    this.store = createStore((state = initialState, action) => {
      switch (action.type) {
        default:
          return state;
      }
    });
  }
  start(issueUrl: string, { duration }) {
    return Promise.resolve(issueUrl)
      .then(parseIssueUrl)
      .then((issue) => {
        return new Zeit({ issue, duration }).save(this.db);
      });
  }
  subscribe(subscription: (state: State) => void) {
    return this.store.subscribe(() => {
      subscription(this.store.getState());
    });
  }
}
