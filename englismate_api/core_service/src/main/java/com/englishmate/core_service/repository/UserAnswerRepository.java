package com.englishmate.core_service.repository;

import com.englishmate.core_service.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {
    List<UserAnswer> findByUserId(Long userId);
    List<UserAnswer> findByLessonId(Long lessonId);
    List<UserAnswer> findByUserIdAndLessonId(Long userId, Long lessonId);
} 