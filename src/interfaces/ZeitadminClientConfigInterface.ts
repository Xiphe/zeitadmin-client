import ZeitDatabaseInterface from './ZeitDatabaseInterface';
import PouchDbErrorHandlerInterface from './PouchDbErrorHandlerInterface';

interface ZeitadminClientConfigInterface {
  db: ZeitDatabaseInterface,
  token: string,
  errorHandler?: PouchDbErrorHandlerInterface
};

export default ZeitadminClientConfigInterface;
