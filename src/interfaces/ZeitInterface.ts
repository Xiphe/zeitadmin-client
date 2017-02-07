import IssueInterface from './IssueInterface';

interface ZeitInterface {
  _id: string,
  issue: IssueInterface,
  duration: number,
  start: number,
  end: number
}

export default ZeitInterface;
