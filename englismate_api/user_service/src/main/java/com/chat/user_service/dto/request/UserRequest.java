package com.chat.user_service.dto.request;

import com.chat.user_service.entity.enumerations.PackageType;
import com.chat.user_service.entity.enumerations.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

/**
 * DTO for user creation and update requests.
 * Contains basic user information and their desired role name and package type.
 */
@Data
public class UserRequest {

    /**
     * The email address of the user. Must be a valid email format.
     */
    @NotBlank(message = "validation.required_field")
    @Email(message = "validation.invalid_email")
    private String email;

    /**
     * The password for the user. Required for new user creation.
     */
    @NotBlank(message = "validation.required_field")
    private String password;

    /**
     * The full name of the user.
     */
    @NotBlank(message = "validation.required_field")
    private String fullName;


    @NotNull
    private Set<String> roles; // For the default role

    /**
     * The package type associated with the user (e.g., FREE, PREMIUM).
     */
    @NotNull(message = "validation.required_field")
    private PackageType packageType;

} 