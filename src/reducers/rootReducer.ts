import StateInterface from '../interfaces/StateInterface';
import { Action } from 'redux';
import { DELETE_ZEIT, INSERT_ZEIT, UPDATE_ZEIT } from '../actions';

const initialState: StateInterface = {
  zeit: []
};

export default (state: StateInterface = initialState, action): StateInterface => {
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
