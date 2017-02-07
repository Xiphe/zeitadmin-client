import ISetTimeAction from '../interfaces/ISetTimeAction';

export const SET_TIME = 'SET_TIME';

export function setTime(time: Number): ISetTimeAction {
  return {
    time,
    type: SET_TIME
  };
}
