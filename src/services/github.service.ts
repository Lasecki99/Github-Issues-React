import axios from "axios";
import instance from "../utils/axiosInstance";
import HttpException from "../utils/exceptions/HttpException";
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
  private static readonly baseUrl = "https://api.github.com";

  static searchRepositoriesByPhrase(
    phrase: string
  ): Promise<GithubRespositoriesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await instance.get<GithubRespositoriesResponse>(
          `${this.baseUrl}/search/repositories?q=${encodeURIComponent(
            phrase
          )}&per_page=10`
        );
        resolve(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          reject(new HttpException(Number(err.response?.status), err.message));
        }
        reject(err);
      }
    });
  }

  static searchUsersByPhrase(phrase: string): Promise<GithubUsersResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await instance.get<GithubUsersResponse>(
          `${this.baseUrl}/search/users?q=${encodeURIComponent(
            phrase
          )}&per_page=10`
        );
        resolve(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          reject(
            new HttpException(
              Number(err.response?.status),
              err.response?.data.message
            )
          );
        }
        reject(err);
      }
    });
  }

  static getUserByLogin(login: string): Promise<UserByLogin> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await instance.get<UserByLogin>(
          `${this.baseUrl}/users/${encodeURIComponent(login)}`
        );
        resolve(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          reject(
            new HttpException(
              Number(err.response?.status),
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

        //We need to make additional request for each user to get required fields (full name, location)
        const users = await Promise.all(
          res[1].items.map((user) => this.getUserByLogin(user.login))
        );

        const items = [...res[0].items, ...users].sort((a, b) => a.id - b.id);

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
