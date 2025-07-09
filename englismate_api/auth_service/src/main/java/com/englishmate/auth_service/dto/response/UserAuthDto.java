package com.englishmate.auth_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * DTO for user authentication responses.
 * Used for Feign client deserialization from user_service.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserAuthDto {
    private String email;
    private String username;
    private String password;
    private Set<String> roles;
}