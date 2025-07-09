package com.englishmate.core_service.dto.lesson;

import com.englishmate.core_service.entity.enumerations.LessonLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


public interface ListeningLessonDTO {
    Long getId();
    String getTitle();
    String getImageUrl();
    String getDescription();
    Integer getDuration();
    String getLevel();
    String getCategory();
    Integer getRating();
    Long getCompletedCount();
}
