package com.englishmate.core_service.repository;

import com.englishmate.core_service.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    // Add custom query methods if needed
} 