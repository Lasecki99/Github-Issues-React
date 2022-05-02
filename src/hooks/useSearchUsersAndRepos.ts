import { useCallback, useEffect } from "react";
import GithubService, { ReposAndUsersMixin } from "../services/github.service";
import HttpException from "../utils/http/HttpException";
import useApiRequest from "./useApiRequest";

const formatError = (error: HttpException) => {
  if (error.status === 403) {
    return "You have reached limit of requests per 60 seconds.";
  } else {
    return "Something went wrong";
  }
};

function useSearchUsersAndRepos(value: string) {
  const fetchFunc = useCallback(
    () => GithubService.searchUsersAndReposByPhrase(value || "nodejs"),
    [value]
  );
  const [apiResponse, apiCallback] =
    useApiRequest<ReposAndUsersMixin>(fetchFunc);

  const apiResponseObj = {
    result: apiResponse.result,
    error: apiResponse.error && formatError(apiResponse.error),
    isFetching: apiResponse.isFetching,
  };

  useEffect(() => {
    apiCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFunc]);

  return apiResponseObj;
}

export default useSearchUsersAndRepos;
