package com.englishmate.core_service.entity;

import com.englishmate.common_service.entity.AbstractAuditEntity;
import com.englishmate.core_service.entity.enumerations.SkillType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "user_answers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAnswer extends AbstractAuditEntity implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(name = "fk_user_id", nullable = false)
    private Long userId;

    @Column(name = "fk_lesson_id", nullable = false)
    private Long lessonId;

    @Column(name = "fk_skill_id", nullable = false)
    private String skillId;

    @Column(name = "score", nullable = false)
    private Double score;

    @Enumerated(EnumType.STRING)
    @Column(name = "lesson_type")
    private SkillType lessonType;
} 
