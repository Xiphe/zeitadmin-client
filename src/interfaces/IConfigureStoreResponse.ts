import { Store } from 'redux';
import IState from './IState';

interface IConfigureStoreResponse {
  store: Store<IState>,
  initiated: Promise<any>,
}

export default IConfigureStoreResponse;
