package com.englishmate.core_service.service.mapper;

import com.englishmate.core_service.dto.lesson.ListeningLessonDTO;
import com.englishmate.core_service.dto.lesson.ListeningLessonDetailDTO;
import com.englishmate.core_service.entity.ListeningLesson;
import org.springframework.stereotype.Service;

@Service
public class ListeningMapper {
    public ListeningLessonDetailDTO toDetailDTO(ListeningLesson lesson) {
        return ListeningLessonDetailDTO.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .imageUrl(lesson.getImageUrl())
                .description(lesson.getDescription())
                .audioUrl(lesson.getAudioUrl())
                .duration(lesson.getDuration())
                .transcript(lesson.getTranscript())
                .level(lesson.getLevel().getName())
                .rating(lesson.getRating())
                .exercise(lesson.getExercise())
                .completedCount(lesson.getCompletedCount())
                .type(lesson.getType())
                .lessonTitle(lesson.getTitle())
                .build();
    }

//    public ListeningLessonDTO toDTO(ListeningLesson lesson) {
//        return ListeningLessonDTO.builder()
//                .id(lesson.getId())
//                .title(lesson.getTitle())
//                .imageUrl(lesson.getImageUrl())
//                .description(lesson.getDescription())
//                .duration(lesson.getDuration())
//                .level(lesson.getLevel().getName())
//                .category(lesson.getCategory().getName())
//                .rating(lesson.getRating())
//                .completedCount(lesson.getCompletedCount())
//                .build();
//    }
}
