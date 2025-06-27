package com.englishmate.common_service.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Builder
public class UserCreationRequest {
    private String email;
    private String password;
    private String fullName; // Corresponds to username in SignupRequest
    private Set<String> roles; // For the default role
    private String packageType; // For the default package type (e.g., FREE)
}