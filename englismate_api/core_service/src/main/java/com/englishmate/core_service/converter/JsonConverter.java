package com.englishmate.core_service.converter;

import com.englishmate.common_service.utils.JsonUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;

@Converter(autoApply = true)
public class JsonConverter implements AttributeConverter<Map<String, Object>, String> {

    @Override
    public String convertToDatabaseColumn(Map<String, Object> stringObjectMap)
    {
        return JsonUtils.toJsonOrEmpty(stringObjectMap);
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String s)
    {
        if (StringUtils.isBlank(s))
        {
            return new HashMap<>();
        }
        return JsonUtils.fromJson(s, new TypeReference<Map<String, Object>>() {});
    }

}
