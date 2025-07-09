package com.englishmate.core_service.repository;

import com.englishmate.core_service.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // Add custom query methods if needed
} 