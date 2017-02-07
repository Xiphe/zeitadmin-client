import IDeleteAction from '../interfaces/IDeleteAction';

export const DELETE_ZEIT = 'DELETE_ZEIT';

export function deleteZeit (id: string): IDeleteAction {
  return {
    id,
    type: DELETE_ZEIT
  };
}
