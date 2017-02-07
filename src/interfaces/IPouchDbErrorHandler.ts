import IZeit from './IZeit';

interface IPouchData {
  response: any,
  doc: IZeit,
  type: String
}

interface IPouchDbErrorHandler {
  (error: Error, data: Array<IPouchData>, callback: (error: Error) => void ): void;
}

export default IPouchDbErrorHandler;
