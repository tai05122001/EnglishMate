package com.englishmate.auth_service.constant;

public final class ErrorCodeConstant {

    public static final String VALIDATION_REQUIRED_FIELD = "validation.required_field";
    public static final String VALIDATION_INVALID_EMAIL = "validation.invalid_email";
    public static final String VALIDATION_INVALID_PASSWORD = "validation.invalid_password";

    public static final String AUTH_ERROR_UNAUTHORIZED = "auth.error.unauthorized";
    public static final String AUTH_ERROR_INVALID_CREDENTIALS = "auth.error.invalid_credentials";
    public static final String AUTH_ERROR_TOKEN_EXPIRED = "auth.error.token_expired";
    public static final String AUTH_ERROR_TOKEN_INVALID = "auth.error.token_invalid";

    public static final String USER_ERROR_NOT_FOUND = "user.error.user_not_found";
    public static final String USER_ERROR_INVALID_STATUS = "user.error.invalid_status";
    public static final String USER_ERROR_ALREADY_EXISTS = "user.error.user_already_exists";

    public static final String SYSTEM_INTERNAL_ERROR = "system.internal_error";
    public static final String SYSTEM_EXTERNAL_SERVICE_ERROR = "system.external_service_error";


    private ErrorCodeConstant() {
        // restrict instantiation
    }
} 