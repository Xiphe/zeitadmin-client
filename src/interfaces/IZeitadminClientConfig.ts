import IZeitDatabase from './IZeitDatabase';
import IPouchDbErrorHandler from './IPouchDbErrorHandler';

interface IZeitadminClientConfig {
  db: IZeitDatabase,
  token: string,
  errorHandler?: IPouchDbErrorHandler
};

export default IZeitadminClientConfig;
