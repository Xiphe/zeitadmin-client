import { Store } from 'redux';
import IZeitDatabase from './interfaces/IZeitDatabase';
import IZeitadminClientConfig from './interfaces/IZeitadminClientConfig';
import IState from './interfaces/IState';
import parseIssueUrl from './lib/parseIssueUrl';
import configureStore from './lib/configureStore';
import { insertZeit, setTime } from './actions';
import createZeit from './lib/createZeit';
import date from './acl/date';

interface ISubscription {
  (state: IState): void
}

const allSubscriptionCancels = [];

export function cancelAllSubscriptions() {
  allSubscriptionCancels.forEach((cancel) => cancel());
}

export default class ZeitadminClient {
  db: IZeitDatabase;
  token: string;
  store: Store<IState>;
  storeInitiated: Promise<any>;
  subscriptions: Array<ISubscription>;
  cancelSubscriptions: Function;
  constructor({ db, token, errorHandler }: IZeitadminClientConfig) {
    this.db = db;
    this.token = token;
    const { store, initiated } = configureStore(db, errorHandler);
    this.store = store;
    this.storeInitiated = initiated;
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
      this.storeInitiated.then(() => {
        if (!this.subscriptions.length) {
          return;
        }

        const unsubscribe = this.store.subscribe(() => {
          const state = this.store.getState();
          this.subscriptions.forEach((subscription) => {
            subscription(state);
          });
        });

        this.store.dispatch(setTime(date.getTime()));
        const interval = setInterval(() => {
          this.store.dispatch(setTime(date.getTime()));
        }, 1000);

        this.cancelSubscriptions = () => {
          clearInterval(interval);
          unsubscribe();
        }
      });
    }

    let canceled = false;
    const cancel = () => {
      if (canceled) {
        return;
      }
      canceled = true;
      this.subscriptions.splice(this.subscriptions.indexOf(subscription), 1);

      if (this.subscriptions.length === 0) {
        this.cancelSubscriptions && this.cancelSubscriptions();
        this.cancelSubscriptions = null;
      }
    };
    allSubscriptionCancels.push(cancel);

    return cancel;
  }
}
