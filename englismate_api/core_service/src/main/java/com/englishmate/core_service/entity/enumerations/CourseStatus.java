package com.englishmate.core_service.entity.enumerations;


import lombok.Getter;

@Getter
public enum CourseStatus {
    UNLOCKED("UNLOCKED"),
    LOCKED("LOCKED");
    private final String value;

    CourseStatus(String value) {
        this.value = value;
    }
}
