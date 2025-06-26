package com.englishmate.core_service.entity;

import com.englishmate.core_service.entity.enumerations.CourseLevel;
import jakarta.persistence.*;
import java.io.Serializable;

/**
 * Entity representing an English course.
 * Each course can have multiple lessons and contains information such as level, duration, and requirements.
 */
@Entity
@Table(name = "course")
public class Course implements Serializable {
    /**
     * Unique identifier for the course.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Level of the course (e.g., Beginner, Intermediate, Advanced).
     */
    @Column(nullable = false)
    private CourseLevel level;

    /**
     * Duration of the course (e.g., '8 weeks').
     */
    @Column(nullable = false)
    private String duration;

    /**
     * Title of the course.
     */
    @Column(nullable = false)
    private String title;

    /**
     * Description of the course content.
     */
    @Column(length = 1000)
    private String description;

    /**
     * Number of students enrolled in the course.
     */
    @Column(nullable = false)
    private Integer students;

    /**
     * Average rating of the course.
     */
    @Column(nullable = false)
    private Double rating;

    /**
     * URL of the course image/poster.
     */
    @Column(name = "image_url")
    private String imageUrl;

    /**
     * Status of the course (locked or unlocked).
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    /**
     * Points required to unlock the course, if applicable.
     */
    @Column(name = "required_points")
    private Integer requiredPoints;

    /**
     * ID of the prerequisite course required to unlock this course, if any.
     */
    @Column(name = "required_course_id")
    private Long requiredCourseId;

    /**
     * Enum representing the status of a course.
     */
    public enum Status {
        /**
         * The course is unlocked and accessible.
         */
        UNLOCKED,
        /**
         * The course is locked and requires conditions to access.
         */
        LOCKED
    }
} 