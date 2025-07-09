import { AxiosError } from "axios";
import type { ApiError } from "../types";

/**
 * Extract the API error message from an Axios error
 * @param error AxiosError object
 * @returns Formatted error message
 */
export const getApiErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Handle Axios errors
    if (error.response?.data) {
      // Extract error from response data if available
      const { message, code } = error.response.data as {
        message?: string;
        code?: string;
      };

      if (message) {
        return message;
      }

      if (code) {
        return `Error: ${code}`;
      }
    }

    // If no structured error in response, use status text or message
    if (error.response?.statusText) {
      return error.response.statusText;
    }

    if (error.message) {
      return error.message;
    }
  }

  // Fallback for non-Axios errors
  return error instanceof Error ? error.message : "An unknown error occurred";
};

/**
 * Extract the API error object from an Axios error
 * @param error AxiosError object
 * @returns ApiError object
 */
export const getApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    // Handle API errors
    if (error.response?.data && typeof error.response.data === "object") {
      const errorData = error.response.data as {
        message?: string;
        code?: string;
        status?: number;
      };

      return {
        message:
          errorData.message || error.message || "An unknown error occurred",
        code: errorData.code || `HTTP_${error.response.status}`,
        status: errorData.status || error.response.status || 500,
      };
    }

    // Generic Axios error
    return {
      message: error.message || "An unknown error occurred",
      code: `HTTP_${error.response?.status || "UNKNOWN"}`,
      status: error.response?.status || 500,
    };
  }

  // Non-Axios errors
  return {
    message:
      error instanceof Error ? error.message : "An unknown error occurred",
    code: "UNKNOWN_ERROR",
    status: 500,
  };
};

/**
 * Handle API error with a callback
 * @param error The caught error
 * @param callback Function to handle the error
 */
export const handleApiError = (
  error: unknown,
  callback?: (error: ApiError) => void
): void => {
  const apiError = getApiError(error);

  // Log error to console
  console.error("API Error:", apiError);

  // Call the callback if provided
  if (callback) {
    callback(apiError);
  }
};
