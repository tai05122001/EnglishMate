import { ENVIRONMENT, API_TIMEOUT } from "./env";

/**
 * Service registry for microservices
 */
export interface ServiceConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

/**
 * Environment-specific service URLs
 */
export const SERVICE_URLS = {
  development: {
    auth: "http://localhost:8081/api/public/auth",
    user: "http://localhost:8082/api/public/user",
    core: "http://localhost:8083/api/public/core",
    payment: "http://localhost:8084/api/public/payment",
  },
  staging: {
    auth: "https://staging-auth.englishmate.com",
    user: "https://staging-user.englishmate.com",
    core: "https://staging-core.englishmate.com",
    payment: "https://staging-payment.englishmate.com",
  },
  production: {
    auth: "https://auth.englishmate.com",
    user: "https://user.englishmate.com",
    core: "https://core.englishmate.com",
    payment: "https://payment.englishmate.com",
  },
};

/**
 * Service type definition for type-safety
 */
export type ServiceName = keyof typeof SERVICE_URLS.production;

/**
 * Service configurations
 */
export const SERVICES: Record<ServiceName, ServiceConfig> = {
  auth: {
    baseUrl: SERVICE_URLS[ENVIRONMENT].auth,
    timeout: API_TIMEOUT,
    requiresAuth: false, // Auth service might not require token for login/register
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  user: {
    baseUrl: SERVICE_URLS[ENVIRONMENT].user,
    timeout: API_TIMEOUT,
    requiresAuth: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  core: {
    baseUrl: SERVICE_URLS[ENVIRONMENT].core,
    timeout: API_TIMEOUT,
    requiresAuth: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  payment: {
    baseUrl: SERVICE_URLS[ENVIRONMENT].payment,
    timeout: API_TIMEOUT * 1.5, // Payment service might need longer timeout
    requiresAuth: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
};

/**
 * Get service configuration
 * @param serviceName Name of the service
 * @returns Service configuration
 */
export function getServiceConfig(serviceName: ServiceName): ServiceConfig {
  return SERVICES[serviceName];
}

/**
 * Get service URL
 * @param serviceName Name of the service
 * @returns Base URL for the service
 */
export function getServiceUrl(serviceName: ServiceName): string {
  return SERVICES[serviceName].baseUrl;
}
