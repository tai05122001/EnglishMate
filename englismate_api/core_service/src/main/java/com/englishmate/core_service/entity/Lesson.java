package com.englishmate.core_service.entity;

import com.englishmate.core_service.entity.enumerations.SkillType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Entity representing a lesson within a course.
 * Each lesson focuses on a specific English skill and belongs to a course.
 */
@Data
@Builder
@Entity
@Table(name = "lesson")
@NoArgsConstructor
@AllArgsConstructor
public class Lesson implements Serializable {
    /**
     * Unique identifier for the lesson.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Title of the lesson.
     */
    @Column(nullable = false)
    private String title;

    /**
     * Description of the lesson content.
     */
    @Column(length = 1000)
    private String description;

    /**
     * Skill type of the lesson (Listening, Speaking, Reading, Writing).
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "skill_type", nullable = false)
    private SkillType skillType;

    /**
     * The course to which this lesson belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    /**
     * Order of the lesson within the course.
     */
    @Column(name = "lesson_order")
    private Integer order;

    /**
     * Duration of the lesson in minutes.
     */
    @Column
    private Integer duration; // duration in minutes

    /**
     * Main content of the lesson.
     */
    @Column(columnDefinition = "TEXT")
    private String content;

} 