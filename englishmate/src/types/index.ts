// Import service types
import type { ServiceName as ServiceNameType } from "../config/services";

// Re-export ServiceName type
export type ServiceName = ServiceNameType;

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Vocabulary related types
export interface VocabularyItem {
  id: string;
  word: string;
  definition: string;
  example: string;
  partOfSpeech: string;
  level: "beginner" | "intermediate" | "advanced";
}

export interface VocabularyList {
  id: string;
  title: string;
  description: string;
  items: VocabularyItem[];
  createdAt: string;
  updatedAt: string;
}

// Progress related types
export interface UserProgress {
  userId: string;
  completedLessons: string[];
  masteredWords: string[];
  currentLevel: string;
  streak: number;
  points: number;
}

// API related types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  search?: string;
  filters?: Record<string, any>;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, any>;
}

// src/types/dto/course.dto.ts
export interface CourseDTO {
  id: number;
  level: string;
  duration: string;
  title: string;
  description: string;
  students: number;
  rating: number;
  imageUrl?: string;
  status: string;
  requiredPoints?: number;
  requiredCourseId?: number;
}

// DTO cho request tạo khóa học mới
export interface CreateCourseDTO {
  title: string;
  imageUrl?: string;
  status: string;
  lessons: LessonDTO[];
}

export interface LessonDTO {
  id: number;
  name: string;
  level: string;
  vocabularyWords: VocabularyWordDTO[];
}

export interface VocabularyWordDTO {
  id: number;
  word: string;
  definition: string;
  examples: Array<ExampleDTO>;
  pronunciation: string;
  isLearned: boolean;
}

export interface ExampleDTO {
  text: string;
  highlightedWord: string;
}

// Request options types
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  withCredentials?: boolean;
  signal?: AbortSignal;
}

// API service response types
export interface ServiceResponse<T> {
  data: T | null;
  error: ApiError | null;
}
