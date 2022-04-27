import { httpClient } from "../utils/http/HttpClient";
import {
  GithubRespositoriesResponse,
  RepositoryItem,
} from "../utils/interfaces/githubRepository.interface";
import {
  GithubUsersResponse,
  UserByLogin,
} from "../utils/interfaces/githubUser.interface";

export interface ReposAndUsersMixin {
  incomplete_results: boolean;
  total_count: number;
  items: (RepositoryItem | UserByLogin)[];
}

class GithubService {
  static searchRepositoriesByPhrase(
    phrase: string
  ): Promise<GithubRespositoriesResponse> {
    return httpClient
      .get<GithubRespositoriesResponse>(
        `/search/repositories?q=${encodeURIComponent(phrase)}&per_page=10`
      )
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  }

  static searchUsersByPhrase(phrase: string): Promise<GithubUsersResponse> {
    return httpClient
      .get<GithubUsersResponse>(
        `/search/users?q=${encodeURIComponent(phrase)}&per_page=10`
      )
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  }

  static getUserByLogin(login: string): Promise<UserByLogin> {
    return httpClient
      .get<UserByLogin>(`/users/${encodeURIComponent(login)}`)
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  }

  static async searchUsersAndReposByPhrase(
    phrase: string
  ): Promise<ReposAndUsersMixin> {
    try {
      const res = await Promise.all([
        this.searchRepositoriesByPhrase(phrase),
        this.searchUsersByPhrase(phrase),
      ]);

      //We need to make additional request for each user to get required fields (full name, location)
      const users = await Promise.all(
        res[1].items.map((user) => this.getUserByLogin(user.login))
      );

      const items = [...res[0].items, ...users].sort((a, b) => a.id - b.id);

      return {
        incomplete_results:
          res[0].incompleteResults || res[1].incompleteResults,
        total_count: res[0].totalCount + res[1].totalCount,
        items,
      };
    } catch (err) {
      throw err;
    }
  }
}

export default GithubService;
