package com.englishmate.core_service.dto.lesson;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

/**
 * Base DTO for quizlet questions in a lesson.
 */
@Data
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = MultipleChoiceQuestionDTO.class, name = "multiple_choice"),
        @JsonSubTypes.Type(value = ShortAnswerQuestionDTO.class, name = "short_answer")
})
public abstract class QuizletQuestionDTO {
    private String question;
} 