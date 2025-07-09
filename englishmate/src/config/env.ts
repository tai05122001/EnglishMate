/**
 * Environment configuration variables
 */

type Environment = "development" | "staging" | "production";

// Current environment or default to development
const env = (import.meta.env.MODE || "development") as Environment;

// Environment-specific API URLs
const API_URLS = {
  development: "http://localhost:8080",
  staging: "https://staging-api.englishmate.com",
  production: "https://api.englishmate.com",
};

// Environment configurations
interface EnvironmentConfig {
  apiUrl: string;
  apiTimeout: number;
  appName: string;
  debug: boolean;
  enableMocks: boolean;
  sentryDsn?: string;
}

// Default configurations
const envConfig: Record<Environment, EnvironmentConfig> = {
  development: {
    apiUrl: import.meta.env.VITE_API_URL || API_URLS.development,
    apiTimeout: 15000,
    appName: "EnglishMate (DEV)",
    debug: true,
    enableMocks: true,
  },
  staging: {
    apiUrl: import.meta.env.VITE_API_URL || API_URLS.staging,
    apiTimeout: 15000,
    appName: "EnglishMate (STAGING)",
    debug: true,
    enableMocks: false,
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  },
  production: {
    apiUrl: import.meta.env.VITE_API_URL || API_URLS.production,
    apiTimeout: 15000,
    appName: "EnglishMate",
    debug: false,
    enableMocks: false,
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  },
};

// Current environment configuration
const config = envConfig[env];

// Feature flags configuration
export const features = {
  enableAnalytics: env === "production",
  enablePremiumFeatures: import.meta.env.VITE_ENABLE_PREMIUM === "true",
  useNewDashboard: import.meta.env.VITE_USE_NEW_DASHBOARD === "true",
};

// Export individual values for easier imports
export const API_URL = config.apiUrl;
export const API_TIMEOUT = config.apiTimeout;
export const APP_NAME = config.appName;
export const DEBUG = config.debug;
export const ENABLE_MOCKS = config.enableMocks;
export const SENTRY_DSN = config.sentryDsn;
export const ENVIRONMENT = env;

// Export entire config object
export default config;
