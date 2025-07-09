import { userApi } from "../../../lib/microservices";
import type { User, ApiResponse, PaginationParams } from "../../../types";

interface UpdateProfileData {
  name?: string;
  email?: string;
  avatar?: string;
  password?: string;
  currentPassword?: string;
}

/**
 * Service for handling user-related API operations
 */
export const userService = {
  /**
   * Get user profile information
   */
  async getProfile(): Promise<User> {
    return userApi.get<User>("/profile");
  },

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileData): Promise<User> {
    return userApi.put<User>("/profile", data);
  },

  /**
   * Change user password
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    return userApi.post<{ success: boolean; message: string }>(
      "/change-password",
      {
        currentPassword,
        newPassword,
      }
    );
  },

  /**
   * Get user progress
   */
  async getUserProgress(): Promise<any> {
    return userApi.get<any>("/progress");
  },

  /**
   * Get all users (admin only)
   */
  async getAllUsers(params?: PaginationParams): Promise<ApiResponse<User[]>> {
    return userApi.get<ApiResponse<User[]>>("/users", { params });
  },

  /**
   * Get user by ID (admin only)
   */
  async getUserById(userId: string): Promise<User> {
    return userApi.get<User>(`/users/${userId}`);
  },

  /**
   * Update user (admin only)
   */
  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    return userApi.put<User>(`/users/${userId}`, data);
  },

  /**
   * Delete user (admin only)
   */
  async deleteUser(userId: string): Promise<void> {
    return userApi.delete<void>(`/users/${userId}`);
  },

  /**
   * Get user statistics (admin only)
   */
  async getUserStatistics(): Promise<any> {
    return userApi.get<any>("/users/statistics");
  },
};
