package com.englishmate.core_service.entity.enumerations;

import lombok.Getter;

@Getter
public enum CourseLevel {
    BEGINNER("BEGINNER"), INTERMEDIATE("INTERMEDIATE");
    private String value;

    CourseLevel(String value) {
        this.value = value;
    }

}
