export interface GithubUsersResponse {
  incompleteResults: boolean;
  totalCount: number;
  items: User[];
}

export interface User {
  avatarUrl: string;
  eventsUrl: string;
  followersUrl: string;
  followingUrl: string;
  gistsUrl: string;
  gravatarId: string;
  htmlUrl: string;
  id: number;
  login: string;
  nodeId: string;
  organizationsUrl: string;
  receivedEventsUrl: string;
  reposUrl: string;
  score?: number;
  siteAdmin: boolean;
  starredUrl: string;
  subscriptionsUrl: string;
  type: string;
  url: string;
}

export interface UserByLogin {
  avatarUrl: string;
  bio: string;
  blog: string;
  company: string;
  createdAt: string;
  email: string;
  eventsUrl: string;
  followers: number;
  followersUrl: string;
  following: number;
  followingUrl: string;
  gistsUrl: string;
  gravatarId: string;
  hireable: boolean;
  htmlUrl: string;
  id: number;
  location: string;
  login: string;
  name: string;
  nodeId: string;
  organizationsUrl: string;
  publicGists: number;
  publicRepos: number;
  receivedEventsUrl: string;
  reposUrl: string;
  siteAdmin: boolean;
  starredUrl: string;
  subscriptionsUrl: string;
  twitterUsername: string;
  type: string;
  updatedAt: string;
  url: string;
}
