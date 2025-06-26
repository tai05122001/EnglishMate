package com.chat.user_service.dto.request;

import com.chat.user_service.entity.enumerations.PackageType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RoleRequest {
    @NotBlank(message = "validation.required_field")
    private String name;
} 