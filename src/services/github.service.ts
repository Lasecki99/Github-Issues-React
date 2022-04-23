import axios from "axios";
import HttpException from "../utils/exceptions/HttpException";
import {
  GithubRespositoriesResponse,
  RepositoryItem,
} from "../utils/interfaces/githubRepository.interface";
import {
  GithubUsersResponse,
  User,
} from "../utils/interfaces/githubUser.interface";

interface ReposAndUsersMixin {
  incomplete_results: boolean;
  total_count: number;
  items: (RepositoryItem | User)[];
}

class GithubService {
  private static readonly baseUrl = "https://api.github.com";

  static searchRepositoriesByPhrase(
    phrase: string
  ): Promise<GithubRespositoriesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get<GithubRespositoriesResponse>(
          `${this.baseUrl}/search/repositories?q=${encodeURIComponent(phrase)}`
        );
        resolve(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          reject(
            new HttpException(
              Number(err.response?.data.status),
              err.response?.data.message
            )
          );
        }
        reject(err);
      }
    });
  }

  static searchUsersByPhrase(phrase: string): Promise<GithubUsersResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get<GithubUsersResponse>(
          `${this.baseUrl}/search/users?q=${encodeURIComponent(phrase)}`
        );
        resolve(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          reject(
            new HttpException(
              Number(err.response?.data.status),
              err.response?.data.message
            )
          );
        }
        reject(err);
      }
    });
  }

  static searchUsersAndReposByPhrase(
    phrase: string
  ): Promise<ReposAndUsersMixin> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Promise.all([
          this.searchRepositoriesByPhrase(phrase),
          this.searchUsersByPhrase(phrase),
        ]);

        const items = [...res[0].items, ...res[1].items].sort(
          (a, b) => a.id - b.id
        );

        resolve({
          incomplete_results:
            res[0].incomplete_results || res[1].incomplete_results,
          total_count: res[0].total_count + res[1].total_count,
          items,
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          reject(
            new HttpException(
              Number(err.response?.data.status),
              err.response?.data.message
            )
          );
        }
        reject(err);
      }
    });
  }
}

export default GithubService;
