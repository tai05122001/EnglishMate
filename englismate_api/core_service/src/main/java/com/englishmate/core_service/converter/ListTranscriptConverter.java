package com.englishmate.core_service.converter;

import com.englishmate.common_service.utils.JsonUtils;
import com.englishmate.core_service.converter.dto.Transcript;
import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Collections;
import java.util.List;

@Converter(autoApply = true)
public class ListTranscriptConverter implements AttributeConverter<List<Transcript>, String> {


    @Override
    public String convertToDatabaseColumn(List<Transcript> transcripts) {
        if (transcripts == null || transcripts.isEmpty()) {
            return null;
        }
        return JsonUtils.toJsonOrThrow(transcripts);
    }

    @Override
    public List<Transcript> convertToEntityAttribute(String jsonString) {
        if (jsonString == null || jsonString.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return JsonUtils.fromJson(jsonString, new TypeReference<List<Transcript>>() {
        });
    }
}
