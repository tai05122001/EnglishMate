package com.englishmate.core_service.dto.lesson;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import java.util.List;

/**
 * DTO for lesson content, supporting instructions, mainContent, and quizlet questions.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LessonContentDTO {
    private String instructions;
    private Object mainContent; // Can be mapped to a specific DTO per skill if needed
    private List<QuizletQuestionDTO> quizlet;
} 