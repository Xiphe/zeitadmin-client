import IState from '../interfaces/IState';
import IZeitDatabase from '../interfaces/IZeitDatabase';
import IPouchDbErrorHandler from '../interfaces/IPouchDbErrorHandler';
import IConfigureStoreResponse from '../interfaces/IConfigureStoreResponse';
import * as PouchMiddleware from 'pouch-redux-middleware';
import { DELETE_ZEIT, INSERT_ZEIT, UPDATE_ZEIT } from '../actions';
import { createStore, applyMiddleware, Store } from 'redux';
import rootReducer from '../reducers';
import PouchDB from 'pouchdb';

export default function configureStore(
  db: IZeitDatabase,
  errorHandler: IPouchDbErrorHandler
): IConfigureStoreResponse {
  let resolve = null;
  let reject = null;
  const initiated = new Promise((r, j) => {
    resolve = r;
    reject = j;
  });

  const pouchMiddleware = new PouchMiddleware({
    path: '/zeit',
    db,
    actions: {
      remove: doc => { return { type: DELETE_ZEIT, id: doc._id } },
      insert: doc => { return { type: INSERT_ZEIT, zeit: doc } },
      update: doc => { return { type: UPDATE_ZEIT, zeit: doc } },
    },
    handleResponse: errorHandler,
    initialBatchDispatched(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    }
  });

  const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(pouchMiddleware)
  );

  return {
    store,
    initiated,
  };
};
