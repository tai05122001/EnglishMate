package com.englishmate.user_service.dto.request;

import com.englishmate.user_service.entity.enumerations.UserStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UpdateStatusRequest {
    private UserStatus status;
    private String email;
}
