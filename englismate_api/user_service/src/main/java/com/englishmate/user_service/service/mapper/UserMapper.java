package com.englishmate.user_service.service.mapper;

import com.englishmate.user_service.dto.request.UserRequest;
import com.englishmate.user_service.dto.response.UserResponse;
import com.englishmate.user_service.entity.Role;
import com.englishmate.user_service.entity.User;
import com.englishmate.user_service.repository.RoleRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * MapStruct mapper for converting between User entities and User DTOs.
 * This abstract class allows for dependency injection (e.g., RoleRepository) for custom mapping logic.
 */
@Mapper(componentModel = "spring")
public abstract class UserMapper {

    @Autowired
    protected RoleRepository roleRepository;

    /**
     * Converts a UserRequest DTO to a User entity.
     * Automatically maps roleName from DTO to Role entity.
     * @param userRequest The UserRequest DTO to convert.
     * @return The converted User entity.
     */
    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapRoles")
    public abstract User toEntity(UserRequest userRequest);

    @Named("mapRoles")
    protected Set<Role> mapRoles(Set<String> roleNames) {
        return roleNames.stream()
                .map(roleRepository::findByName)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
    }


    /**
     * Converts a User entity to a UserResponse DTO.
     * Maps the Role entity's name to roleName in the DTO.
     * @param user The User entity to convert.
     * @return The converted UserResponse DTO.
     */
    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapRolesDto")
    public abstract UserResponse toDto(User user);

    @Named("mapRolesDto")
    protected Set<String> mapRolesDto(Set<Role> roleNames) {
        return roleNames
                .stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
    }

}