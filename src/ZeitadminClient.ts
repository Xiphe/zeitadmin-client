import ZeitDatabaseInterface from './interfaces/ZeitDatabaseInterface';
import ZeitadminClientConfigInterface from './interfaces/ZeitadminClientConfigInterface';
import parseIssueUrl from './parseIssueUrl';
import Zeit from './Zeit';

export default class ZeitadminClient {
  db: ZeitDatabaseInterface;
  token: string;
  constructor({ db, token }: ZeitadminClientConfigInterface) {
    this.db = db;
    this.token = token;
  }
  start(issueUrl: string, { duration }) {
    return Promise.resolve(issueUrl)
      .then(parseIssueUrl)
      .then((issue) => {
        return new Zeit({ issue, duration }).save(this.db);
      });
  }
}
