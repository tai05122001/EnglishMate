package com.chat.user_service.exception.user;

import com.chat.user_service.exception.BadRequestException;

public class UserNotFoundException extends BadRequestException {
    public UserNotFoundException(String message) {
        super(message);
    }
} 