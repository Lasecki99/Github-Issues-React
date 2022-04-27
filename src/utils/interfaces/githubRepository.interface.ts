import { User } from "./githubUser.interface";

export interface GithubRespositoriesResponse {
  incompleteResults: boolean;
  totalCount: number;
  items: RepositoryItem[];
}

interface RespositoryLicense {
  key: string;
  name: string;
  nodeId: string;
  spdxId: string;
  url: string;
}

export interface RepositoryItem {
  allowForking: boolean;
  archiveUrl: string;
  archived: boolean;
  assigneesUrl: string;
  blobsUrl: string;
  branchesUrl: string;
  cloneUrl: string;
  collaboratorsUrl: string;
  commentsUrl: string;
  commitsUrl: string;
  compareUrl: string;
  contentsUrl: string;
  contributorsUrl: string;
  createdAt: string;
  defaultBranch: string;
  deploymentsUrl: string;
  description: string;
  disabled: boolean;
  downloadsUrl: string;
  eventsUrl: string;
  fork: boolean;
  forks: number;
  forksCount: number;
  forksUrl: string;
  fullName: string;
  gitCommitsUrl: string;
  gitRefsUrl: string;
  gitTagsUrl: string;
  gitUrl: string;
  hasDownloads: boolean;
  hasIssues: boolean;
  hasPages: boolean;
  hasProjects: boolean;
  hasWiki: boolean;
  homepage: string | null;
  hooksUrl: string;
  htmlUrl: string;
  id: number;
  isTemplate: boolean;
  issueCommentUrl: string;
  issueEventsUrl: string;
  issuesUrl: string;
  keysUrl: string;
  labelsUrl: string;
  language: string;
  languagesUrl: string;
  license: RespositoryLicense;
  mergesUrl: string;
  milestonesUrl: string;
  mirrorUrl: string | null;
  name: string;
  nodeId: string;
  notificationsUrl: string;
  openIssues: number;
  openIssues_count: number;
  owner: User;
  private: false;
  pullsUrl: string;
  pushedAt: string;
  releasesUrl: string;
  score: number;
  size: number;
  sshUrl: string;
  stargazersCount: number;
  stargazersUrl: string;
  statusesUrl: string;
  subscribersUrl: string;
  subscriptionUrl: string;
  svnUrl: string;
  tagsUrl: string;
  teamsUrl: string;
  topics: string[];
  treesUrl: string;
  updatedAt: string;
  url: string;
  visibility: string;
  watchers: number;
  watchersCount: number;
}
