package com.englishmate.user_service.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Represents a Role entity in the system. Roles are used to define user permissions.
 */
@Entity
@Table(name = "roles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The name of the role (e.g., "ROLE_USER", "ROLE_ADMIN"). Must be unique.
     */
    @Column(nullable = false, unique = true, name = "name")
    private String name; // e.g., "ROLE_USER", "ROLE_ADMIN"
} 