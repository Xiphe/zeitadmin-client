import IIssue from './IIssue';

interface IZeit {
  _id: string,
  issue: IIssue,
  duration: number,
  start: number,
  end: number
}

export default IZeit;
