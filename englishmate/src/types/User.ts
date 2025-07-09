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

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  masteredWords: string[];
  currentLevel: string;
  streak: number;
  points: number;
}
