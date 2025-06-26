package com.chat.user_service.constant;

/**
 * Constants for error codes used in the application.
 * These codes are typically used for internationalization on the frontend.
 */
public final class ErrorCodeConstant {

    // Validation error codes
    public static final String VALIDATION_REQUIRED_FIELD = "validation.required_field";
    public static final String VALIDATION_INVALID_EMAIL = "validation.invalid_email";

    // User-related error codes
    public static final String USER_ERROR_USER_NOT_FOUND = "user.error.user_not_found";
    public static final String USER_ERROR_EMAIL_ALREADY_EXISTS = "user.error.email_already_exists";

    // Role-related error codes
    public static final String VALIDATION_PASSWORD_MISMATCH = "validation.password_mismatch";
    public static final String VALIDATION_INVALID_OLD_PASSWORD = "validation.invalid_old_password";
    public static final String ROLE_ERROR_ROLE_NOT_FOUND = "role.error.role_not_found";

    /**
     * Private constructor to prevent instantiation of this utility class.
     */
    private ErrorCodeConstant() {
        // Private constructor to prevent instantiation
    }
} 