package com.englishmate.common_service.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UpdateStatusRequest {
    private String status;
    private String email;
}
