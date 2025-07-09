package com.englishmate.core_service.converter.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizQuestion {
    private String question;
    private List<String> options;
    private int answer;
}
