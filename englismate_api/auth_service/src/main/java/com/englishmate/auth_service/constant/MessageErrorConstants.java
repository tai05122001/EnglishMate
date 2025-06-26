package com.englishmate.auth_service.constant;

import org.springframework.beans.factory.annotation.Value;

public final class MessageErrorConstants {
    public static final String EMAIL_CANNOT_BE_EMPTY = "Email cannot be empty";
    public static final String PASSWORD_CANNOT_BE_EMPTY = "Password cannot be empty";
    public static final String USER_WITH_EMAIL_NOT_EXISTS = "User with this email not exists";
    public static final String USER_WITH_CHANGE_STATUS_ERROR = "User with change status error";
    public static final String INVALID_EMAIL_OR_PASSWORD = "Invalid email or password";
    public static final String REFRESH_TOKEN_NOT_FOUND = "Refresh token not found";
    public static final String REFRESH_TOKEN_EXPIRED = "Refresh token is expired";
    public static final String USER_ASSOCIATED_WITH_REFRESH_TOKEN_NOT_FOUND = "User associated with refresh token not found";
    public static final String USER_REGISTERED_SUCCESSFULLY = "User registered successfully!";
    public static final String FAILED_TO_REGISTER_USER = "Failed to register user.";
    public static final String LOGOUT_SUCCESSFUL = "Logout successful";
    private MessageErrorConstants() {}
}