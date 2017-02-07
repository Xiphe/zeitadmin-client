import ZeitInterface from './ZeitInterface';

interface PouchDataInterface {
  response: any,
  doc: ZeitInterface,
  type: String
}

interface PouchDbErrorHandlerInterface {
  (error: Error, data: Array<PouchDataInterface>, callback: (error: Error) => void ): void;
}

export default PouchDbErrorHandlerInterface;
