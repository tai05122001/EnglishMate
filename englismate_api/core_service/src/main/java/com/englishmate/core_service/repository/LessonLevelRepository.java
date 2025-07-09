package com.englishmate.core_service.repository;

import com.englishmate.core_service.entity.LessonLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonLevelRepository extends JpaRepository<LessonLevel, Long> {
    // Custom query methods (if needed) go here
} 