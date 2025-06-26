package com.chat.user_service.entity;

import com.chat.user_service.entity.enumerations.PackageType;
import com.chat.user_service.entity.enumerations.UserStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * Represents a User entity in the system. Contains user details and their associated role and package type.
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The full name of the user.
     */
    @Column(name = "username")
    private String username;

    /**
     * The email address of the user. Must be unique.
     */
    @Column(nullable = false, unique = true)
    private String email;

    /**
     * The hashed password of the user.
     */
    @Column(nullable = false)
    private String password;

    /**
     * The full name of the user.
     */
    @Column(name = "full_name")
    private String fullName;

    /**
     * The current status of the user (e.g., ACTIVE, INACTIVE).
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;

    /**
     * The roles associated with the user, linked to the Role entity.
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
               joinColumns = @JoinColumn(name = "user_id"),
               inverseJoinColumns = @JoinColumn(name = "role_id"))
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    /**
     * The package type associated with the user (e.g., FREE, PREMIUM).
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "package_type", nullable = false)
    private PackageType packageType;

    /**
     * The points balance of the user.
     */
    @Column(nullable = false)
    private Integer point;

}