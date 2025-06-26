package com.englishmate.core_service.dto.lesson;

import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;

/**
 * DTO for multiple choice quizlet questions.
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class MultipleChoiceQuestionDTO extends QuizletQuestionDTO {
    private List<String> options;
    private int answer;
} 