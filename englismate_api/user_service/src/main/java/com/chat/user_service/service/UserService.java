package com.chat.user_service.service;

import com.chat.user_service.dto.request.LoginRequest;
import com.chat.user_service.dto.request.UpdateStatusRequest;
import com.chat.user_service.dto.request.UserRequest;
import com.chat.user_service.dto.request.ResetPasswordRequest;
import com.chat.user_service.dto.response.UserResponse;
import com.chat.user_service.dto.response.RoleResponse;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service interface for managing user-related operations.
 * Defines the contract for user business logic.
 */
@Service
public interface UserService {
    /**
     * Updates an existing user's information.
     * @return The updated user's response DTO.
     */
    Boolean activeUser(UpdateStatusRequest request);

    /**
     * Retrieves a user by their ID.
     * @param id The ID of the user to retrieve.
     * @return The user's response DTO.
     */
    UserResponse getUserById(Long id);

    /**
     * Deletes a user by their ID.
     * @param id The ID of the user to delete.
     */
    void deleteUser(Long id);

    /**
     * Retrieves a list of all users.
     * @return A list of user response DTOs.
     */
    List<UserResponse> getAllUsers();

    /**
     * Creates a new user.
     * @param userRequest The DTO containing the new user information.
     * @return The created user's response DTO.
     */
    UserResponse createUser(UserRequest userRequest);

    /**
     * Retrieves a user by their email address.
     * @param email The email address of the user to retrieve.
     * @return The user's response DTO.
     */
    UserResponse getUserByEmail(String email);

    /**
     * @param username
     * @return
     */
    UserResponse getUserByUsername(String username);

}