package com.englishmate.core_service.repository;

import com.englishmate.core_service.dto.lesson.ListeningLessonDTO;
import com.englishmate.core_service.dto.lesson.ListeningLessonDetailDTO;
import com.englishmate.core_service.entity.ListeningLesson;
import com.englishmate.core_service.entity.enumerations.LessonLevel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListeningLessonRepository extends JpaRepository<ListeningLesson, Long> {
    Page<ListeningLesson> findByLevel(LessonLevel level, Pageable pageable);

    Page<ListeningLesson> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<ListeningLesson> findByLevelAndTitleContainingIgnoreCase(LessonLevel level, String title, Pageable pageable);

    @Query(value = """
            SELECT 
                   ll.id,
                   ll.title,
                   ll.image_url AS imageUrl, 
                   ll.description,
                   ll.duration,
                   level.name as level,
                   c.name AS category,
                   ll.rating, 
                   ll.completed_count as completedCount
             FROM listening_lessons ll 
                LEFT JOIN categories c ON ll.fk_category_id = c.id
                LEFT JOIN  lesson_levels level ON ll.fk_lesson_level_id = level.id
             WHERE 1 = 1 
                 AND (:level is null OR ll.fk_lesson_level_id = :level)
                AND (:title is null OR ll.title LIKE CONCAT('%', :title, '%'))
                 AND (:category is null OR ll.fk_category_id = :category)                        
            """, countQuery = """
            SELECT COUNT(*)
            FROM listening_lessons ll 
                LEFT JOIN categories c ON ll.fk_category_id = c.id
                LEFT JOIN  lesson_levels level ON ll.fk_lesson_level_id = level.id
            WHERE 1 = 1 
                 AND (:level is null OR ll.fk_lesson_level_id = :level)
                 AND (:title is null OR ll.title LIKE CONCAT('%', :title, '%'))
                 AND (:category is null OR ll.fk_category_id = :category)
            """, nativeQuery = true)
    Page<ListeningLessonDTO> findListeningLessonBy(@Param("level") Long level,
                                                             @Param("category") Long category,
                                                             @Param("title") String title,
                                                             Pageable pageable);
}
