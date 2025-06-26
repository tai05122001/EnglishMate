package com.chat.user_service.service.mapper;

import com.chat.user_service.dto.request.RoleRequest;
import com.chat.user_service.dto.response.RoleResponse;
import com.chat.user_service.entity.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toEntity(RoleRequest roleRequest);

    RoleResponse toResponse(Role role);
}
