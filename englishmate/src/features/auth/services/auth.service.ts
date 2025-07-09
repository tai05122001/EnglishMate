import { authApi } from "../../../lib/microservices";
import type { User, AuthResponse } from "../../../types";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  roles: string[];
}

interface RefreshTokenResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export const authService = {
  /**
   * Login a user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return authApi.post<AuthResponse>("/login", credentials);
  },

  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    return authApi.post<AuthResponse>("/register", userData);
  },

  /**
   * Get the current logged-in user profile
   */
  async getCurrentUser(): Promise<User> {
    return authApi.get<User>("/profile");
  },

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    await authApi.post<void>("/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },

  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },

  /**
   * Refresh the authentication token
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    return authApi.post<RefreshTokenResponse>("/refresh-token", {
      refreshToken,
    });
  },

  /**
   * Save authentication data to localStorage
   */
  saveAuthData(authData: AuthResponse): void {
    localStorage.setItem("token", authData.token);
    if ("refreshToken" in authData) {
      localStorage.setItem("refreshToken", (authData as any).refreshToken);
    }
  },

  /**
   * Clear authentication data from localStorage
   */
  clearAuthData(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },
};
