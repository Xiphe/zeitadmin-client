import { Action } from 'redux';
import ZeitInterface from './ZeitInterface';

interface ZeitActionInterface extends Action {
  zeit: ZeitInterface
}

export default ZeitActionInterface;
