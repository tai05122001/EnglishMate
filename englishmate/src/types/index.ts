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
  level: 'beginner' | 'intermediate' | 'advanced';
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
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
} 