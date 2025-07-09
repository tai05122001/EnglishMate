package com.englishmate.core_service.entity;

import com.englishmate.common_service.entity.AbstractAuditEntity;
import com.englishmate.core_service.converter.ListTranscriptConverter;
import com.englishmate.core_service.converter.QuizQuestionListConverter;
import com.englishmate.core_service.converter.dto.QuizQuestion;
import com.englishmate.core_service.converter.dto.Transcript;
import com.englishmate.core_service.entity.enumerations.QuestionType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "listening_lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListeningLesson extends AbstractAuditEntity implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_lesson_id")
    private Lesson lesson;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String audioUrl;

    @Column(nullable = false)
    private Integer duration;

    @Column
    @Convert(converter = ListTranscriptConverter.class)
    private List<Transcript> transcript;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_lesson_level_id", referencedColumnName = "id")
    private LessonLevel level;

    @Column(nullable = false)
    private Integer rating;

    @Column
    @Convert(converter = QuizQuestionListConverter.class)
    private List<QuizQuestion> exercise;

    @Column(name = "completed_count", columnDefinition = "TEXT")
    private Long completedCount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType type;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_category_id", referencedColumnName = "id")
    private Category category;

} 
