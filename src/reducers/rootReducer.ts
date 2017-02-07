import IState from '../interfaces/IState';
import IZeit from '../interfaces/IZeit';
import date from '../acl/date';
import { Action } from 'redux';
import { DELETE_ZEIT, INSERT_ZEIT, UPDATE_ZEIT, SET_TIME } from '../actions';

const initialState: IState = {
  zeit: [],
  time: date.getTime()
};

export default (state: IState = initialState, action): IState => {
  switch (action.type) {
    case SET_TIME:
      return {
        ...state,
        time: action.time
      };
    case INSERT_ZEIT:
      return {
        ...state,
        zeit: [
          ...state.zeit,
          action.zeit
        ]
      }
    default:
      return state;
  }
}

export function selectZeit(state: IState): Array<IZeit> {
  return state.zeit;
}
