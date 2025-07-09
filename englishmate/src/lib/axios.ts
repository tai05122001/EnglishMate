import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store";
import { logout } from "../store/authSlice";
import { API_URL, API_TIMEOUT, DEBUG } from "../config/env";

// Configure axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request queue for handling token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}> = [];

/**
 * Process the queue of failed requests
 * @param token The new token
 * @param error Any error that occurred during refresh
 */
const processQueue = (
  error: AxiosError | null,
  token: string | null = null
): void => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      resolve(axiosInstance(config));
    }
  });

  failedQueue = [];
};

/**
 * Get token from Redux store or localStorage
 */
const getToken = (): string | null => {
  // Try Redux store first (preferred)
  const state = store.getState();
  if (state.auth?.token) {
    return state.auth.token;
  }

  // Fallback to localStorage
  return localStorage.getItem("token");
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token
    const token = getToken();

    // If token exists, add to headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add timestamp to prevent caching for GET requests
    if (config.method?.toLowerCase() === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    // Log request in development mode
    if (DEBUG) {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
        {
          headers: config.headers,
          params: config.params,
          data: config.data,
        }
      );
    }

    return config;
  },
  (error) => {
    if (DEBUG) {
      console.error("❌ Request Error:", error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development mode
    if (DEBUG) {
      console.log(
        `✅ API Response: ${response.config.method?.toUpperCase()} ${
          response.config.url
        }`,
        {
          status: response.status,
          data: response.data,
        }
      );
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Log error in development mode
    if (DEBUG) {
      console.error(
        `❌ API Error: ${originalRequest?.method?.toUpperCase()} ${
          originalRequest?.url
        }`,
        {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        }
      );
    }

    // Handle 401 (Unauthorized) errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Check if we're already refreshing to avoid infinite loops
      if (isRefreshing) {
        // If we're already refreshing, add this request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        if (response.data && response.data.token) {
          // Update token in localStorage and Redux store
          const { token } = response.data;
          localStorage.setItem("token", token);

          if (response.data.refreshToken) {
            localStorage.setItem("refreshToken", response.data.refreshToken);
          }

          // Update Redux store if available
          store.dispatch({
            type: "auth/loginSuccess",
            payload: response.data,
          });

          // Update Authorization header
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }

          // Process the queue with the new token
          processQueue(null, token);

          // Retry the original request
          return axiosInstance(originalRequest);
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (refreshError) {
        // Handle refresh token failure
        processQueue(refreshError as AxiosError, null);

        // Clear auth data and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        // Dispatch logout action to Redux
        store.dispatch(logout());

        // Redirect to login page
        window.location.href = "/auth";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle specific error codes
    switch (error.response?.status) {
      case 400:
        // Bad request - could add specific handling here
        break;
      case 403:
        // Forbidden - user doesn't have permission
        console.error("Access forbidden");
        break;
      case 404:
        // Not found
        console.error("Resource not found");
        break;
      case 500:
        // Server error
        console.error("Server error occurred");
        break;
      default:
        // Handle network errors
        if (!error.response) {
          console.error("Network error - please check your connection");
        }
        break;
    }

    return Promise.reject(error);
  }
);

// Export the axios instance
export default axiosInstance;

// Helper functions for API calls
export const api = {
  /**
   * GET request helper
   */
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },

  /**
   * POST request helper
   */
  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },

  /**
   * PUT request helper
   */
  put: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },

  /**
   * DELETE request helper
   */
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },

  /**
   * PATCH request helper
   */
  patch: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosInstance.patch<T>(url, data, config);
    return response.data;
  },
};
