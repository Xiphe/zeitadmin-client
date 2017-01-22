import IssueInterface from './interfaces/IssueInterface';

function stripGithub(issueUrl: string): string {
  const match = issueUrl.match(/github\.com\/(.*)/);

  if (match) {
    return match[1].split('?')[0].split('#')[0];
  }

  return issueUrl;
}

function normalize(issue) {
  return issue.replace(/\/(issues|pull)\//, '#');
}

export default function parseIssueUrl(issueUrl: string): IssueInterface {
  const tokens = normalize(stripGithub(issueUrl)).split('/');
  const errStr = `Could not parse issue "${issueUrl}", please use github url or owner/repo#1 formart`;

  if (tokens.length !== 2) {
    throw new Error(errStr);
  }

  const owner = tokens[0];
  const moreTokens = tokens[1].split('#');

  if (moreTokens.length !== 2) {
    throw new Error(errStr);
  }

  const repo = moreTokens[0];
  const number = moreTokens[1];

  return {
    owner,
    repo,
    number,
  };
}
