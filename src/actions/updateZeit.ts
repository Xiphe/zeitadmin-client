import ZeitActionInterface from '../interfaces/ZeitActionInterface';
import ZeitInterface from '../interfaces/ZeitInterface';

export const UPDATE_ZEIT = 'UPDATE_ZEIT';

export function updateZeit (zeit: ZeitInterface): ZeitActionInterface {
  return {
    zeit,
    type: UPDATE_ZEIT
  };
};
