import ZeitDatabaseInterface from './ZeitDatabaseInterface';

interface ZeitadminClientConfigInterface {
  db: ZeitDatabaseInterface,
  token: string,
};

export default ZeitadminClientConfigInterface;
