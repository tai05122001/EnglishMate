import { useState, useCallback, useEffect } from "react";
import { handleApiError, getApiErrorMessage } from "../utils/api-error";
import type { ApiError, ServiceName } from "../types";
import { createServiceApi } from "../lib/microservices";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  success: boolean;
}

type ApiFunction<T, P extends any[]> = (...params: P) => Promise<T>;

/**
 * Hook for handling API requests with a specific microservice
 * @param serviceName Name of the service to use
 * @param apiPath Path to API endpoint (without base URL)
 * @param method HTTP method to use
 * @returns API state and execution function
 */
export function useServiceApi<T, B = any>(
  serviceName: ServiceName,
  apiPath: string,
  method: "get" | "post" | "put" | "delete" | "patch" = "get"
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  // Get the service API instance
  const api = createServiceApi(serviceName);

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
    async (body?: B, config?: any) => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        success: false,
      }));

      try {
        let data: T;

        // Call the appropriate method based on the HTTP method
        switch (method) {
          case "get":
            data = await api.get<T>(apiPath, config);
            break;
          case "post":
            data = await api.post<T>(apiPath, body, config);
            break;
          case "put":
            data = await api.put<T>(apiPath, body, config);
            break;
          case "delete":
            data = await api.delete<T>(apiPath, config);
            break;
          case "patch":
            data = await api.patch<T>(apiPath, body, config);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

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
    [api, apiPath, method]
  );

  return {
    ...state,
    execute,
    reset,
  };
}

/**
 * Hook for handling API requests that should run immediately when the component mounts
 * @param serviceName Name of the service to use
 * @param apiPath Path to API endpoint (without base URL)
 * @param method HTTP method to use
 * @param body Body to send with the request (for POST, PUT, PATCH)
 * @param config Additional configuration for the request
 * @returns API state and execution function
 */
export function useServiceApiOnMount<T, B = any>(
  serviceName: ServiceName,
  apiPath: string,
  method: "get" | "post" | "put" | "delete" | "patch" = "get",
  body?: B,
  config?: any
) {
  const api = useServiceApi<T, B>(serviceName, apiPath, method);

  // Fetch data on mount
  const fetchData = useCallback(async () => {
    return api.execute(body, config);
  }, [api, body, config]);

  // Use useEffect to run on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...api,
    refetch: fetchData,
  };
}
