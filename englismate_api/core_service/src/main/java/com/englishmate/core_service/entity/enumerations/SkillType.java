package com.englishmate.core_service.entity.enumerations;

import lombok.Getter;

/**
 * Enum representing the skill type of a lesson: Listening, Speaking, Reading, or Writing.
 */
@Getter
public enum SkillType {
    /**
     * Listening skill.
     */
    LISTENING("LISTENING"),
    /**
     * Speaking skill.
     */
    SPEAKING("SPEAKING"),
    /**
     * Reading skill.
     */
    READING("READING"),
    /**
     * Writing skill.
     */
    WRITING("WRITING");

    private final String value;

    SkillType(String value) {
        this.value = value;
    }
} 