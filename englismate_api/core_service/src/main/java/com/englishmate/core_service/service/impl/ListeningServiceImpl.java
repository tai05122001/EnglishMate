package com.englishmate.core_service.service.impl;

import com.englishmate.core_service.dto.lesson.ListeningLessonDTO;
import com.englishmate.core_service.dto.lesson.ListeningLessonDetailDTO;
import com.englishmate.core_service.entity.ListeningLesson;
import com.englishmate.core_service.entity.enumerations.LessonLevel;
import com.englishmate.core_service.repository.ListeningLessonRepository;
import com.englishmate.core_service.service.ListeningService;
import com.englishmate.core_service.service.mapper.ListeningMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ListeningServiceImpl implements ListeningService {

    private final ListeningLessonRepository listeningLessonRepository;
    private final ListeningMapper listeningMapper;

    @Override
    public Page<ListeningLessonDTO> getAllListeningLessons(Long level, Long category, String title, Pageable pageable) {
        // Determine which repository method to use based on params
       return listeningLessonRepository.findListeningLessonBy(level, category, title, pageable);
    }

    @Override
    public ListeningLessonDetailDTO getListeningLessonById(Long id) {
        Optional<ListeningLesson> lesson = listeningLessonRepository.findById(id);
        return lesson.map(listeningMapper::toDetailDTO).orElse(null);
    }

    @Override
    public List<LessonLevel> getAllLessonLevels() {
        return Arrays.asList(LessonLevel.values());
    }

    @Override
    public List<String> getAllTopics() {
        return null;
    }

}
