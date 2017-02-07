import { Action } from 'redux';
import IZeit from './IZeit';

interface IZeitAction extends Action {
  zeit: IZeit
}

export default IZeitAction;
