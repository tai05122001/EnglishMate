import { coreApi } from "../../../lib/microservices";
import type {
  CourseDTO,
  CreateCourseDTO,
  ApiResponse,
  PaginationParams,
} from "../../../types";

/**
 * Service for handling course-related API operations
 */
export const courseService = {
  /**
   * Get all courses with optional pagination
   * @param params Pagination parameters
   * @returns List of courses
   */
  async getAllCourses(
    params?: PaginationParams
  ): Promise<ApiResponse<CourseDTO[]>> {
    return coreApi.get<ApiResponse<CourseDTO[]>>("/courses", { params });
  },

  /**
   * Get a course by its ID
   * @param id Course ID
   * @returns Course details
   */
  async getCourseById(id: number): Promise<CourseDTO> {
    return coreApi.get<CourseDTO>(`/courses/${id}`);
  },

  /**
   * Create a new course
   * @param course Course data
   * @returns Created course
   */
  async createCourse(course: CreateCourseDTO): Promise<CourseDTO> {
    return coreApi.post<CourseDTO>("/courses", course);
  },

  /**
   * Update an existing course
   * @param id Course ID
   * @param course Course data
   * @returns Updated course
   */
  async updateCourse(
    id: number,
    course: Partial<CourseDTO>
  ): Promise<CourseDTO> {
    return coreApi.put<CourseDTO>(`/courses/${id}`, course);
  },

  /**
   * Delete a course
   * @param id Course ID
   * @returns Void
   */
  async deleteCourse(id: number): Promise<void> {
    return coreApi.delete<void>(`/courses/${id}`);
  },

  /**
   * Get courses by level
   * @param level Course level
   * @param params Pagination parameters
   * @returns List of courses
   */
  async getCoursesByLevel(
    level: string,
    params?: PaginationParams
  ): Promise<ApiResponse<CourseDTO[]>> {
    return coreApi.get<ApiResponse<CourseDTO[]>>("/courses", {
      params: {
        ...params,
        level,
      },
    });
  },

  /**
   * Get recommended courses for the user
   * @returns List of recommended courses
   */
  async getRecommendedCourses(): Promise<CourseDTO[]> {
    return coreApi.get<CourseDTO[]>("/courses/recommended");
  },

  /**
   * Get user enrolled courses
   * @returns List of enrolled courses
   */
  async getEnrolledCourses(): Promise<CourseDTO[]> {
    return coreApi.get<CourseDTO[]>("/courses/enrolled");
  },

  /**
   * Enroll in a course
   * @param courseId Course ID
   * @returns Enrollment status
   */
  async enrollCourse(
    courseId: number
  ): Promise<{ success: boolean; message: string }> {
    return coreApi.post<{ success: boolean; message: string }>(
      `/courses/${courseId}/enroll`
    );
  },
};
