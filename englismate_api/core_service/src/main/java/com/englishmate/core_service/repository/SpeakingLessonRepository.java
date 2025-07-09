package com.englishmate.core_service.repository;

import com.englishmate.core_service.entity.SpeakingLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpeakingLessonRepository extends JpaRepository<SpeakingLesson, Long> {
    // Add custom query methods if needed
} 