package com.englishmate.auth_service.dto.user;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleAuthDto {
    private Long id;
    private String name; // e.g., "ROLE_USER", "ROLE_ADMIN"
} 