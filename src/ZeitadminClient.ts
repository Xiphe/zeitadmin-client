import { Store } from 'redux';
import IZeitDatabase from './interfaces/IZeitDatabase';
import IZeitadminClientConfig from './interfaces/IZeitadminClientConfig';
import IState from './interfaces/IState';
import parseIssueUrl from './parseIssueUrl';
import configureStore from './configureStore';
import { insertZeit, setTime } from './actions';
import createZeit from './createZeit';
import date from './acl/date';

interface ISubscription {
  (state: IState): void
}

export default class ZeitadminClient {
  db: IZeitDatabase;
  token: string;
  store: Store<IState>;
  subscriptions: Array<ISubscription>;
  cancelSubscriptions: Function;
  constructor({ db, token, errorHandler }: IZeitadminClientConfig) {
    this.db = db;
    this.token = token;
    this.store = configureStore(db, errorHandler);
    this.subscriptions = [];
  }
  start(issueUrl: string, { duration }) {
    this.store.dispatch(insertZeit(createZeit({
      issue: parseIssueUrl(issueUrl),
      duration
    })));
  }
  subscribe(subscription: ISubscription) {
    this.subscriptions.push(subscription);

    if (this.subscriptions.length === 1) {
      setTimeout(() => {
        if (!this.subscriptions.length) {
          return;
        }

        const unsubscribe = this.store.subscribe(() => {
          const state = this.store.getState();
          this.subscriptions.forEach((subscription) => {
            subscription(state);
          });
        });

        const interval = setInterval(() => {
          this.store.dispatch(setTime(date.getTime()))
        }, 1000);

        this.cancelSubscriptions = () => {
          clearInterval(interval);
          unsubscribe();
        }

      /* We don't want all the initial setup spam */
      }, 100);
    }

    return () => {
      this.subscriptions.splice(this.subscriptions.indexOf(subscription), 1);

      if (this.subscriptions.length === 0) {
        this.cancelSubscriptions && this.cancelSubscriptions();
        this.cancelSubscriptions = null;
      }
    };
  }
}
