import IState from '../interfaces/IState';
import IZeit from '../interfaces/IZeit';
import { selectZeit } from '../reducers';

export function selectZeitAtTime(state: IState, time: Number): Array<IZeit> {
  return selectZeit(state).filter((zeit) => {
    return zeit.end >= time;
  });
}
