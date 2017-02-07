import DeleteActionInterface from '../interfaces/DeleteActionInterface';

export const DELETE_ZEIT = 'DELETE_ZEIT';

export function deleteZeit (id: string): DeleteActionInterface {
  return {
    id,
    type: DELETE_ZEIT
  };
}
