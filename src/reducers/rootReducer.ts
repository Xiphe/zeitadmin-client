import IState from '../interfaces/IState';
import { Action } from 'redux';
import { DELETE_ZEIT, INSERT_ZEIT, UPDATE_ZEIT } from '../actions';

const initialState: IState = {
  zeit: []
};

export default (state: IState = initialState, action): IState => {
  switch (action.type) {
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
