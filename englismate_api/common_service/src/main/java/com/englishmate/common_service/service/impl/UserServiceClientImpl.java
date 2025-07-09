package com.englishmate.common_service.service.impl;

import com.englishmate.common_service.dto.request.UpdateStatusRequest;
import com.englishmate.common_service.dto.request.UserCreationRequest;
import com.englishmate.common_service.dto.response.UserAuthDto;
import com.englishmate.common_service.service.UserServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class UserServiceClientImpl implements UserServiceClient {

    @Autowired
    @Qualifier("webClientUser")
    private WebClient webClientUser;

    /**
     * Retrieves user details from the user_service by email.
     * @param email The email of the user to retrieve.
     * @return A Mono containing UserAuthDto if found, otherwise an empty Mono.
     */
    public Mono<UserAuthDto> getUserByEmail(String email) {
        return webClientUser.get()
                .uri("/api/public/users/email/{email}", email) // Assuming user_service will have this endpoint
                .retrieve()
                .bodyToMono(UserAuthDto.class)
                .onErrorResume(e -> {
                    // Log the error or handle specific exceptions (e.g., 404 Not Found)
                    System.err.println("Error fetching user from user_service: " + e.getMessage());
                    return Mono.empty(); // Return empty if user not found or error occurs
                });
    }

    @Override
    public Mono<UserAuthDto> getUserByUsername(String username) {
        return webClientUser.get()
                .uri("/api/public/users/username/{username}", username) // Assuming user_service will have this endpoint
                .retrieve()
                .bodyToMono(UserAuthDto.class)
                .onErrorResume(e -> {
                    // Log the error or handle specific exceptions (e.g., 404 Not Found)
                    System.err.println("Error fetching user from user_service: " + e.getMessage());
                    return Mono.empty(); // Return empty if user not found or error occurs
                });
    }

    /**
     * Sends a request to user_service to create a new user.
     *
     * @param userCreationRequest The DTO containing new user information.
     * @return A Mono containing UserAuthDto of the created user, or an error.
     */
    @Override
    public Mono<Void> createUser(UserCreationRequest userCreationRequest) {
        return webClientUser.post()
                .uri("/api/public/users") // Endpoint for creating users in user_service
                .bodyValue(userCreationRequest)
                .retrieve()
                .bodyToMono(Void.class)
                .onErrorResume(e -> {
                    System.err.println("Error creating user in user_service: " + e.getMessage());
                    return Mono.error(new RuntimeException("Failed to create user in user_service", e)); // Re-throw or handle specific error
                });
    }

    @Override
    public Mono<Boolean> updateStatusUser(UpdateStatusRequest request) {
        return webClientUser.put()
                .uri("/api/public/users/status") // Endpoint for creating users in user_service
                .bodyValue(request)
                .retrieve()
                .bodyToMono(Boolean.class)
                .onErrorResume(e -> {
                    System.err.println("Error creating user in user_service: " + e.getMessage());
                    return Mono.error(new RuntimeException("Failed to create user in user_service", e)); // Re-throw or handle specific error
                });
    }

}
