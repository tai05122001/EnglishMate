import type { QuizletQuestionDTO } from "./QuizletQuestionDTO";

export interface LessonContentDTO {
  instructions?: string;
  mainContent?: any;
  quizlet?: QuizletQuestionDTO[];
}
