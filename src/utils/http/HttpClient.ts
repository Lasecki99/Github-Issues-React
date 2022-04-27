import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Buffer as buffer } from "buffer";
import { camelizeKeys } from "humps";
import HttpException from "./HttpException";

const username: string = process.env.REACT_APP_GITHUB_USERNAME as string,
  token: string = process.env.REACT_APP_GITHUB_TOKEN as string,
  authToken = buffer.from(String(`${username}:${token}`)).toString("base64");

class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = this.initHttp();
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.client.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.client.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.client.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.client.delete<T, R>(url, config);
  }

  private initHttp() {
    const http = axios.create({
      baseURL: "https://api.github.com",
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    http.interceptors.response.use((response: AxiosResponse) => {
      if (response.data) {
        response.data = camelizeKeys(response.data);
      }
      return response;
    });
    return http;
  }

  private handleError(error: AxiosResponse<any, any> | undefined) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(
        new HttpException(
          Number(error.response?.status),
          error.response?.data.message
        )
      );
    }

    return Promise.reject(error);
  }
}

export const httpClient = new HttpClient();
