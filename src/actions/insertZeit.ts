import ZeitActionInterface from '../interfaces/ZeitActionInterface';
import ZeitInterface from '../interfaces/ZeitInterface';

export const INSERT_ZEIT = 'INSERT_ZEIT';

export function insertZeit (zeit: ZeitInterface): ZeitActionInterface {
  return {
    zeit,
    type: INSERT_ZEIT
  };
};
