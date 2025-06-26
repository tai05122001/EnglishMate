package com.englishmate.auth_service.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Builder
public class JwtResponse {
    private String token;
    private String type;
    private String username;
    private String email;
    private Set<String> roles;
} 