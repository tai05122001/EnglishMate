package com.englishmate.auth_service.client;

import com.englishmate.common_service.dto.request.UserCreationRequest;
import com.englishmate.common_service.dto.request.UpdateStatusRequest;
import com.englishmate.auth_service.dto.response.UserAuthDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

/**
 * Feign client interface for communicating with the User Service
 */
@FeignClient(name = "user-service", url = "${user-service.base-url}")
public interface UserServiceFeignClient {

    /**
     * Creates a new user in the user service
     * 
     * @param userCreationRequest The user details to create
     * @return Void as the API returns no content
     */
    @PostMapping("/api/public/users")
    void createUser(@RequestBody UserCreationRequest userCreationRequest);

    /**
     * Retrieves user details by email
     * 
     * @param email The email of the user to retrieve
     * @return UserAuthDto containing user details
     */
    @GetMapping("/api/public/users/email/{email}")
    UserAuthDto getUserByEmail(@PathVariable("email") String email);

    /**
     * Retrieves user details by username
     * 
     * @param username The username of the user to retrieve
     * @return UserAuthDto containing user details
     */
    @GetMapping("/api/public/users/username/{username}")
    UserAuthDto getUserByUsername(@PathVariable("username") String username);

    /**
     * Updates the status of a user
     * 
     * @param request The request containing email and status
     * @return Boolean indicating success/failure
     */
    @PutMapping("/api/public/users/status")
    Boolean updateStatusUser(@RequestBody UpdateStatusRequest request);
}