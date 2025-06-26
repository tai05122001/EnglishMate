package com.chat.user_service.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO for password reset requests.
 * Contains the user's email, old password, and new password details.
 */
@Data
public class ResetPasswordRequest {

    /**
     * The email of the user requesting password reset.
     */
    @NotBlank(message = "validation.required_field")
    @Email(message = "validation.invalid_email")
    private String email;

    /**
     * The user's current password, required for verification.
     */
    @NotBlank(message = "validation.required_field")
    private String oldPassword;

    /**
     * The new password for the user.
     */
    @NotBlank(message = "validation.required_field")
    private String newPassword;

    /**
     * Confirmation of the new password, must match newPassword.
     */
    @NotBlank(message = "validation.required_field")
    private String confirmNewPassword;
} 