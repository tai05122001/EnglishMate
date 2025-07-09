import type { QuizletQuestionDTO } from "./QuizletQuestionDTO";

export interface MultipleChoiceQuestionDTO extends QuizletQuestionDTO {
  options: string[];
  answer: number;
}
