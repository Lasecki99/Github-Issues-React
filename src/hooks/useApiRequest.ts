import { useState, useCallback, useMemo } from "react";
import HttpException from "../utils/http/HttpException";

export interface ApiResponse<T> {
  result?: T;
  error?: HttpException;
  isFetching: boolean;
}

type UseApiResponse<T> = [ApiResponse<T>, (...args: any[]) => Promise<void>];

function useApiRequest<T>(
  serviceMethod: (...args: any[]) => Promise<T>
): UseApiResponse<T> {
  const [result, setResult] = useState<T | undefined>(undefined);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState<HttpException | undefined>(undefined);

  const apiCallback = useCallback(
    async (...args: any) => {
      setError(undefined);
      setFetching(true);
      try {
        const result = await serviceMethod(...args);
        setResult(result);
      } catch (error: any) {
        setError(error);
      }
      setFetching(false);
    },
    [serviceMethod]
  );

  const apiResponse = useMemo(
    () => ({
      result,
      error,
      isFetching,
    }),
    [result, error, isFetching]
  );

  return [apiResponse, apiCallback];
}

export default useApiRequest;
