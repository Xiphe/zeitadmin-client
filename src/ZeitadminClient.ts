import { Store } from 'redux';
import IZeitDatabase from './interfaces/IZeitDatabase';
import IZeitadminClientConfig from './interfaces/IZeitadminClientConfig';
import IState from './interfaces/IState';
import parseIssueUrl from './parseIssueUrl';
import configureStore from './configureStore';
import { insertZeit } from './actions';
import createZeit from './createZeit';

export default class ZeitadminClient {
  db: IZeitDatabase;
  token: string;
  store: Store<IState>;
  constructor({ db, token, errorHandler }: IZeitadminClientConfig) {
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
  subscribe(subscription: (state: IState) => void) {
    return this.store.subscribe(() => {
      subscription(this.store.getState());
    });
  }
}
