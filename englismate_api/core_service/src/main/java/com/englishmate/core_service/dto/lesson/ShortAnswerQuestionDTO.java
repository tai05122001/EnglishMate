package com.englishmate.core_service.dto.lesson;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO for short answer quizlet questions.
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class ShortAnswerQuestionDTO extends QuizletQuestionDTO {
    // No extra fields for now
} 