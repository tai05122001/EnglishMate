import axios from "../../../lib/axios";
import type { User, AuthResponse } from "../../../types";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  /**
   * Login a user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>("/auth/register", userData);
    return response.data;
  },

  /**
   * Get the current logged-in user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await axios.get<User>("/auth/profile");
    return response.data;
  },

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    await axios.post("/auth/logout");
    localStorage.removeItem("token");
  },

  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },
};
