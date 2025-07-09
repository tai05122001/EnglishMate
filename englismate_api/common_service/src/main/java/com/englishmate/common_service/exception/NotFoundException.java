package com.englishmate.common_service.exception;

import org.springframework.http.HttpStatus;

import static com.englishmate.common_service.constant.ErrorConstants.ERR_RESOURCE_NOT_FOUND;


public class NotFoundException extends BaseHttpException {

    public NotFoundException() {
        super(ERR_RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND, "Not Found", null);
    }

    public NotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND, message, null);
    }

}
