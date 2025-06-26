package com.englishmate.auth_service.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserCreationRequest {
    private String email;
    private String password;
    private String fullName; // Corresponds to username in SignupRequest
    private String roleName; // For the default role
    private String packageType; // For the default package type (e.g., FREE)
} 