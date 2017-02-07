import { Store } from 'redux';
import ZeitDatabaseInterface from './interfaces/ZeitDatabaseInterface';
import ZeitadminClientConfigInterface from './interfaces/ZeitadminClientConfigInterface';
import StateInterface from './interfaces/StateInterface';
import parseIssueUrl from './parseIssueUrl';
import configureStore from './configureStore';
import { insertZeit } from './actions';
import createZeit from './createZeit';

export default class ZeitadminClient {
  db: ZeitDatabaseInterface;
  token: string;
  store: Store<StateInterface>;
  constructor({ db, token, errorHandler }: ZeitadminClientConfigInterface) {
    this.db = db;
    this.token = token;
    this.store = configureStore(db, errorHandler);
  }
  start(issueUrl: string, { duration }) {
    this.store.dispatch(insertZeit(createZeit({
      issue: parseIssueUrl(issueUrl),
      duration
    })));
  }
  subscribe(subscription: (state: StateInterface) => void) {
    return this.store.subscribe(() => {
      subscription(this.store.getState());
    });
  }
}
