import IState from './interfaces/IState';
import IZeitDatabase from './interfaces/IZeitDatabase';
import IPouchDbErrorHandler from './interfaces/IPouchDbErrorHandler';
import * as PouchMiddleware from 'pouch-redux-middleware';
import { DELETE_ZEIT, INSERT_ZEIT, UPDATE_ZEIT } from './actions';
import { createStore, applyMiddleware, Store } from 'redux';
import rootReducer from './reducers';
import PouchDB from 'pouchdb';

const noopErrorHandler: IPouchDbErrorHandler = (error, data, callback) => {
  callback(error);
}

export default function configureStore(
  db: IZeitDatabase,
  errorHandler: IPouchDbErrorHandler = noopErrorHandler
): Store<IState> {
  const pouchMiddleware = new PouchMiddleware({
    path: '/zeit',
    db,
    actions: {
      remove: doc => { return { type: DELETE_ZEIT, id: doc._id } },
      insert: doc => { return { type: INSERT_ZEIT, zeit: doc } },
      update: doc => { return { type: UPDATE_ZEIT, zeit: doc } },
    },
    handleResponse: errorHandler
  });

  const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(pouchMiddleware)
  );

  return store;
};
