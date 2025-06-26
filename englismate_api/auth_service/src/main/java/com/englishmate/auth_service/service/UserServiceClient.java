package com.englishmate.auth_service.service;

import com.englishmate.auth_service.dto.request.LoginRequest;
import com.englishmate.auth_service.dto.request.UpdateStatusRequest;
import com.englishmate.auth_service.dto.request.UserCreationRequest;
import com.englishmate.auth_service.dto.user.UserAuthDto;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public interface UserServiceClient {
    /**
     * Retrieves user details from the user_service by email.
     * @param email The email of the user to retrieve.
     * @return A Mono containing UserAuthDto if found, otherwise an empty Mono.
     */
     Mono<UserAuthDto> getUserByEmail(String email);

    /**
     * Retrieves user details from the user_service by email.
     * @param username The email of the user to retrieve.
     * @return A Mono containing UserAuthDto if found, otherwise an empty Mono.
     */
    Mono<UserAuthDto> getUserByUsername(String username);

    /**
     * Sends a request to user_service to create a new user.
     * @param userCreationRequest The DTO containing new user information.
     * @return A Mono containing UserAuthDto of the created user, or an error.
     */
     Mono<UserAuthDto> createUser(UserCreationRequest userCreationRequest);

    /**
     * @param request The DTO containing new user information.
     * @return A Mono containing UserAuthDto of the created user, or an error.
     */
    Mono<Boolean> updateStatusUser (UpdateStatusRequest request);


} 