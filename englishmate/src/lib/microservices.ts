import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { getServiceConfig } from "../config/services";
import type { ServiceName } from "../config/services";
import store from "../store";
import { logout } from "../store/authSlice";
import { DEBUG } from "../config/env";

// Map to store service instances
const serviceInstances = new Map<ServiceName, AxiosInstance>();

// Cache to prevent multiple retries for the same request
const retryCache = new Set<string>();

/**
 * Create retry key for caching
 * @param config Request config
 * @returns Cache key
 */
const createRetryKey = (config: AxiosRequestConfig): string => {
  return `${config.method || "get"}-${config.url}-${Date.now()}`;
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

/**
 * Get an Axios instance for a specific microservice
 * @param serviceName Name of the service
 * @returns Axios instance configured for the service
 */
export function getServiceInstance(serviceName: ServiceName): AxiosInstance {
  // Return existing instance if available
  if (serviceInstances.has(serviceName)) {
    return serviceInstances.get(serviceName)!;
  }

  // Get service configuration
  const serviceConfig = getServiceConfig(serviceName);

  // Create new Axios instance
  const instance = axios.create({
    baseURL: serviceConfig.baseUrl,
    timeout: serviceConfig.timeout || 150000,
    headers: serviceConfig.headers || {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Add request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add auth token if required
      if (serviceConfig.requiresAuth && config.headers) {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // Add timestamp for GET requests to prevent caching
      if (config.method?.toLowerCase() === "get") {
        config.params = {
          ...config.params,
          _t: Date.now(),
        };
      }

      // Log request in development mode
      if (DEBUG) {
        console.log(
          `🚀 [${serviceName.toUpperCase()}] API Request: ${config.method?.toUpperCase()} ${
            config.url
          }`,
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
        console.error(
          `❌ [${serviceName.toUpperCase()}] Request Error:`,
          error
        );
      }
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development mode
      if (DEBUG) {
        console.log(
          `✅ [${serviceName.toUpperCase()}] API Response: ${response.config.method?.toUpperCase()} ${
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
        _retryCount?: number;
      };

      // Log error in development mode
      if (DEBUG) {
        console.error(
          `❌ [${serviceName.toUpperCase()}] API Error: ${originalRequest?.method?.toUpperCase()} ${
            originalRequest?.url
          }`,
          {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          }
        );
      }

      // Implement retry logic for network errors or specific status codes
      if (
        !originalRequest?._retry &&
        originalRequest &&
        (error.code === "ECONNABORTED" ||
          !error.response ||
          error.response.status >= 500 ||
          error.response.status === 429)
      ) {
        // Retry up to 2 times with exponential backoff
        const retryCount = originalRequest._retryCount || 0;
        if (retryCount < 2) {
          originalRequest._retry = true;
          originalRequest._retryCount = retryCount + 1;

          // Create retry key
          const retryKey = createRetryKey(originalRequest);

          // If we're already retrying, don't try again
          if (retryCache.has(retryKey)) {
            return Promise.reject(error);
          }

          // Add to retry cache
          retryCache.add(retryKey);

          // Exponential backoff delay
          const delay = Math.pow(2, retryCount) * 1000;

          // Wait and retry
          await new Promise((resolve) => setTimeout(resolve, delay));

          // Remove from retry cache
          retryCache.delete(retryKey);

          // Retry the request
          return instance(originalRequest);
        }
      }

      // Handle auth errors for auth service
      if (serviceName === "auth" && error.response?.status === 401) {
        // Special handling for auth service 401s
        if (originalRequest?.url !== "/auth/refresh-token") {
          // If it's not a refresh token request, log the user out
          store.dispatch(logout());
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/auth";
        }
      }

      // Handle 401 errors for services that require auth
      if (serviceConfig.requiresAuth && error.response?.status === 401) {
        // Try to refresh the token
        try {
          // Get the auth service instance
          const authService = getServiceInstance("auth");
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const response = await authService.post("/auth/refresh-token", {
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

            // Retry the original request
            return instance(originalRequest);
          } else {
            throw new Error("Failed to refresh token");
          }
        } catch (refreshError) {
          // Handle refresh token failure
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");

          // Dispatch logout action to Redux
          store.dispatch(logout());

          // Redirect to login page
          window.location.href = "/auth";

          return Promise.reject(refreshError);
        }
      }

      // Handle other errors based on status code
      switch (error.response?.status) {
        case 400:
          // Bad request - could add specific handling here
          break;
        case 403:
          // Forbidden - user doesn't have permission
          console.error(`[${serviceName.toUpperCase()}] Access forbidden`);
          break;
        case 404:
          // Not found
          console.error(`[${serviceName.toUpperCase()}] Resource not found`);
          break;
        default:
          // Handle network errors
          if (!error.response) {
            console.error(
              `[${serviceName.toUpperCase()}] Network error - please check your connection`
            );
          }
          break;
      }

      return Promise.reject(error);
    }
  );

  // Store instance in map for reuse
  serviceInstances.set(serviceName, instance);

  return instance;
}

/**
 * Clear service instances cache
 * Useful when changing environments or for testing
 */
export function clearServiceInstances(): void {
  serviceInstances.clear();
}

/**
 * Type-safe API helper for a specific service
 * @param serviceName Name of the service
 * @returns API methods for the service
 */
export function createServiceApi(serviceName: ServiceName) {
  const instance = getServiceInstance(serviceName);

  return {
    /**
     * GET request helper
     */
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      const response = await instance.get<T>(url, config);
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
      const response = await instance.post<T>(url, data, config);
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
      const response = await instance.put<T>(url, data, config);
      return response.data;
    },

    /**
     * DELETE request helper
     */
    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      const response = await instance.delete<T>(url, config);
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
      const response = await instance.patch<T>(url, data, config);
      return response.data;
    },
  };
}

// Pre-create APIs for each service for easier imports
export const authApi = createServiceApi("auth");
export const userApi = createServiceApi("user");
export const coreApi = createServiceApi("core");
export const paymentApi = createServiceApi("payment");

// Default export for dynamic service access
export default {
  getServiceInstance,
  createServiceApi,
};
