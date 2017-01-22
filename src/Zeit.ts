import IssueInterface from './interfaces/IssueInterface';
import UnstartedZeitInterface from './interfaces/UnstartedZeitInterface';
import ZeitConfigInterface from './interfaces/ZeitConfigInterface';
import ZeitDatabaseInterface from './interfaces/ZeitDatabaseInterface';
import uuid from './acl/uuid';
import date from './acl/date';
import Deferred from './Deferred';

export default class Zeit {
  _data: {
    _id: string;
    issue: IssueInterface;
    duration: number;
    start: number;
    end: number;
  };
  constructor({ issue, duration }: ZeitConfigInterface) {
    if (typeof duration !== 'number' || duration <= 1000) {
      throw new Error(`Can not create zeit with duration of ${duration}`);
    }

    const now = date.getTime();

    this._data = {
      _id: uuid.create(),
      issue: {
        owner: issue.owner,
        repo: issue.repo,
        number: issue.number,
      },
      duration,
      start: now,
      end: now + duration
    };
  }
  save(db: ZeitDatabaseInterface): Promise<void> {
    const d = new Deferred();

    db.put(this._data, (err, doc) => {
      if (err) {
        d.reject(new Error('unable to start zeit'));
      }

      d.resolve();
    });

    return d.promise;
  }
}

