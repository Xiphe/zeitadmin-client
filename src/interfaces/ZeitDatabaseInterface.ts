
interface ZeitDatabaseInterface {
  get: (id: string, callback: (err: Error, document: Object) => void) => void,
  put: (doc: { _id: string }, callback: (err: Error, document: Object) => void) => void,
}

export default ZeitDatabaseInterface;
