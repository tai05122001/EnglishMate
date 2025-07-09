import { useState, useCallback, useEffect } from "react";
import { handleApiError, getApiErrorMessage } from "../utils/api-error";
import type { ApiError } from "../types";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  success: boolean;
}

type ApiFunction<T, P extends any[]> = (...params: P) => Promise<T>;

/**
 * Hook for handling API requests with loading, error, and success states
 * @param apiFunc The API function to call
 * @returns API state and execution function
 */
export function useApi<T, P extends any[]>(apiFunc: ApiFunction<T, P>) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  // Reset the state
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  // Execute the API call
  const execute = useCallback(
    async (...params: P) => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        success: false,
      }));

      try {
        const data = await apiFunc(...params);
        setState({
          data,
          loading: false,
          error: null,
          success: true,
        });
        return { data, error: null };
      } catch (error) {
        const apiError = {
          message: getApiErrorMessage(error),
          code: error instanceof Error ? error.name : "UNKNOWN_ERROR",
          status:
            error instanceof Error && "status" in error
              ? (error as any).status
              : 500,
        };

        setState({
          data: null,
          loading: false,
          error: apiError,
          success: false,
        });

        handleApiError(error);
        return { data: null, error: apiError };
      }
    },
    [apiFunc]
  );

  return {
    ...state,
    execute,
    reset,
  };
}

/**
 * Hook for handling API requests that should run immediately when the component mounts
 * @param apiFunc The API function to call
 * @param params Parameters to pass to the API function
 * @returns API state and execution function
 */
export function useApiOnMount<T, P extends any[]>(
  apiFunc: ApiFunction<T, P>,
  ...params: P
) {
  const api = useApi(apiFunc);

  const fetchData = useCallback(async () => {
    return api.execute(...params);
  }, [api, ...params]);

  // Use useEffect to run on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...api,
    refetch: fetchData,
  };
}
