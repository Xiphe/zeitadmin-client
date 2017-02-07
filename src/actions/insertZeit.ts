import IZeitAction from '../interfaces/IZeitAction';
import IZeit from '../interfaces/IZeit';

export const INSERT_ZEIT = 'INSERT_ZEIT';

export function insertZeit(zeit: IZeit): IZeitAction {
  return {
    zeit,
    type: INSERT_ZEIT
  };
};
