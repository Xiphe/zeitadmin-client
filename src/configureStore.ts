import StateInterface from './interfaces/StateInterface';
import ZeitDatabaseInterface from './interfaces/ZeitDatabaseInterface';
import PouchDbErrorHandlerInterface from './interfaces/PouchDbErrorHandlerInterface';
import * as PouchMiddleware from 'pouch-redux-middleware';
import { DELETE_ZEIT, INSERT_ZEIT, UPDATE_ZEIT } from './actions';
import { createStore, applyMiddleware, Store } from 'redux';
import rootReducer from './reducers';
import PouchDB from 'pouchdb';

const noopErrorHandler: PouchDbErrorHandlerInterface = (error, data, callback) => {
  callback(error);
}

export default function configureStore(
  db: ZeitDatabaseInterface,
  errorHandler: PouchDbErrorHandlerInterface = noopErrorHandler
): Store<StateInterface> {
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
