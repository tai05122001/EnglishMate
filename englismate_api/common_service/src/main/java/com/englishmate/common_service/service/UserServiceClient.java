package com.englishmate.common_service.service;

import com.englishmate.common_service.dto.request.UpdateStatusRequest;
import com.englishmate.common_service.dto.request.UserCreationRequest;
import com.englishmate.common_service.dto.response.UserAuthDto;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public interface UserServiceClient {
    Mono<UserAuthDto> getUserByEmail(String email);
    Mono<UserAuthDto> getUserByUsername(String username);
    Mono<Void> createUser(UserCreationRequest userCreationRequest);
    Mono<Boolean> updateStatusUser(UpdateStatusRequest request);
} 