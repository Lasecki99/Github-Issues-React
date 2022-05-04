import { renderHook, act } from "@testing-library/react";
import { AxiosInstance } from "axios";
import useApi, { ApiResponse } from "../useApiRequest";
import MockAdapter from "axios-mock-adapter";
import { httpClient } from "../../utils/http/HttpClient";
import HttpException from "../../utils/http/HttpException";

interface MockApi {
  mockGetServiceMethod: () => Promise<string>;
}
const MockService = (httpClient: AxiosInstance): MockApi => {
  return {
    mockGetServiceMethod: () =>
      httpClient.get("/test").then(({ data }) => data),
  };
};

const httpClientMock = new MockAdapter(httpClient.client);
const mockService = MockService(httpClient.client);

describe("useApi", () => {
  beforeEach(() => {
    httpClientMock.reset();
  });

  test("triggers only when callback is called", async () => {
    httpClientMock.onGet("/test").reply(200, "data");

    const { result } = renderHook(() =>
      useApi(mockService.mockGetServiceMethod)
    );
    let [apiResponse, apiCallback] = result.current;
    let emptyApiResponse: ApiResponse<string> = {
      result: undefined,
      isFetching: false,
      error: undefined,
    };

    expect(apiResponse).toStrictEqual(emptyApiResponse);

    await act(apiCallback);

    [apiResponse] = result.current;

    expect(apiResponse.result).toEqual("data");
  });

  test("sets error if network error occurs", async () => {
    httpClientMock.onGet("/test").networkError();

    const { result } = renderHook(() =>
      useApi(mockService.mockGetServiceMethod)
    );
    let [apiResponse, apiCallback] = result.current;

    expect(apiResponse.error).toBeUndefined();
    await act(apiCallback);

    [apiResponse] = result.current;

    expect(apiResponse.error).toStrictEqual(
      new HttpException(500, "Something went wrong")
    );
  });

  test("sets error if backend error occurs", async () => {
    httpClientMock.onGet("/test").reply(500);

    const { result } = renderHook(() =>
      useApi(mockService.mockGetServiceMethod)
    );
    let [apiResponse, apiCallback] = result.current;

    expect(apiResponse.error).toBeUndefined();
    await act(apiCallback);

    [apiResponse] = result.current;

    expect(apiResponse.error).toStrictEqual(
      new HttpException(500, "Something went wrong")
    );
  });

  test("re-sets error when new fetch is initiated", async () => {
    // 1st call - yields an error
    httpClientMock.onGet("/test").reply(500);
    const { result } = renderHook(() =>
      useApi(mockService.mockGetServiceMethod)
    );
    let [apiResponse, apiCallback] = result.current;

    expect(apiResponse.error).toBeUndefined();
    await act(apiCallback);

    [apiResponse] = result.current;

    expect(apiResponse.error).toStrictEqual(
      new HttpException(500, "Something went wrong")
    );

    // 2nd call - does not yield an error, previous error should not persist
    httpClientMock.onGet("/test").reply(200, "data");
    await act(apiCallback);
    [apiResponse] = result.current;

    expect(apiResponse.error).toBeUndefined();
    expect(apiResponse.result).toEqual("data");
  });

  test("sets result if successful", async () => {
    httpClientMock.onGet("/test").reply(200, "data");

    const { result } = renderHook(() =>
      useApi(mockService.mockGetServiceMethod)
    );
    const [, apiCallback] = result.current;
    await act(apiCallback);

    const [apiResponse] = result.current;

    expect(apiResponse.result).toEqual("data");
  });
});
