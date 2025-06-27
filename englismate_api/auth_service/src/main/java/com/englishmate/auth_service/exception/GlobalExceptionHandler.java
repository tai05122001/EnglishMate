package com.englishmate.auth_service.exception;

import com.englishmate.auth_service.dto.response.MessageResponse;
import com.englishmate.common_service.constant.ErrorCodeConstant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    @ResponseBody
    public ResponseEntity<MessageResponse> handleBadRequestException(BadRequestException ex) {
        MessageResponse response = MessageResponse.builder()
                .message(ex.getMessage())
                .errorCode(ex.getErrorCode())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(JwtAuthenticationException.class)
    @ResponseBody
    public ResponseEntity<MessageResponse> handleJwtAuthenticationException(JwtAuthenticationException ex) {
        MessageResponse response = MessageResponse.builder()
                .message(ex.getMessage())
                .errorCode(ex.getErrorCode())
                .build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ResponseEntity<MessageResponse> handleValidationException(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldError() != null ?
                ex.getBindingResult().getFieldError().getDefaultMessage() : "Validation error";
        MessageResponse response = MessageResponse.builder()
                .message(message)
                .errorCode(ErrorCodeConstant.VALIDATION_REQUIRED_FIELD)
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<MessageResponse> handleGeneralException(Exception ex) {
        MessageResponse response = MessageResponse.builder()
                .message("Internal server error")
                .errorCode(ErrorCodeConstant.SYSTEM_INTERNAL_ERROR)
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
} 