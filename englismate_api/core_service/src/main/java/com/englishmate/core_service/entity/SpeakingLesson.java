package com.englishmate.core_service.entity;

import com.englishmate.common_service.entity.AbstractAuditEntity;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "speaking_exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpeakingLesson extends AbstractAuditEntity implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long speakingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_lesson_id")
    private Lesson lesson;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String script;

    private String audioUrl;

    @Column(columnDefinition = "TEXT")
    private String instructions;
} 
