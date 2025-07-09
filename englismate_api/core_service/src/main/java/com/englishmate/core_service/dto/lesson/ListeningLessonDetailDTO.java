package com.englishmate.core_service.dto.lesson;

import com.englishmate.core_service.converter.dto.QuizQuestion;
import com.englishmate.core_service.converter.dto.Transcript;
import com.englishmate.core_service.entity.enumerations.LessonLevel;
import com.englishmate.core_service.entity.enumerations.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListeningLessonDetailDTO {
    private Long id;
    private String title;
    private String imageUrl;
    private String description;
    private String audioUrl;
    private Integer duration;
    private List<Transcript> transcript;
    private String level;
    private Integer rating;
    private List<QuizQuestion> exercise;
    private Long completedCount;
    private QuestionType type;
    private String lessonTitle;
    private String courseTitle;
} 
