package com.chat.user_service.dto.response;

import com.chat.user_service.entity.Role;
import com.chat.user_service.entity.enumerations.PackageType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

/**
 * DTO for user responses.
 * Contains user details to be sent as a response, including the role name.
 */
@Getter
@Setter
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String username;
    private String password;
    private PackageType packageType;
    private Set<String> roles;
    private Integer point;
} 