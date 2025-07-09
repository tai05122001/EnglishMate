package com.englishmate.core_service.service;

import com.englishmate.core_service.dto.lesson.ListeningLessonDTO;
import com.englishmate.core_service.dto.lesson.ListeningLessonDetailDTO;
import com.englishmate.core_service.entity.enumerations.LessonLevel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ListeningService {
    Page<ListeningLessonDTO> getAllListeningLessons(Long level, Long category, String title, Pageable pageable);
    ListeningLessonDetailDTO getListeningLessonById(Long id);
    List<LessonLevel> getAllLessonLevels();
    List<String> getAllTopics();
}
