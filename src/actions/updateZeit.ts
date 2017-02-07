import IZeitAction from '../interfaces/IZeitAction';
import IZeit from '../interfaces/IZeit';

export const UPDATE_ZEIT = 'UPDATE_ZEIT';

export function updateZeit (zeit: IZeit): IZeitAction {
  return {
    zeit,
    type: UPDATE_ZEIT
  };
};
