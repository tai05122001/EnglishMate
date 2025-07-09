package com.englishmate.user_service.exception.user;

import com.englishmate.user_service.exception.BadRequestException;

public class UserNotFoundException extends BadRequestException {
    public UserNotFoundException(String message) {
        super(message);
    }
} 