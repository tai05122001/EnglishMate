package com.englishmate.user_service.controller.publics;

import com.englishmate.user_service.dto.request.UpdateStatusRequest;
import com.englishmate.user_service.dto.request.UserRequest;
import com.englishmate.user_service.dto.response.UserResponse;
import com.englishmate.user_service.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing public user-related operations.
 * All business logic is delegated to the UserService.
 */
@RestController
@RequestMapping("/api/public/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Updates an existing user's information.
     * 
     * @return A ResponseEntity with the updated UserResponse and HTTP status OK.
     */
    @PutMapping("/status")
    public ResponseEntity<Boolean> updateStatusUser(@RequestBody UpdateStatusRequest request) {
        Boolean isUpdate = userService.activeUser(request);
        return ResponseEntity.ok(isUpdate);
    }

    /**
     * Retrieves a user by their ID.
     * 
     * @param id The ID of the user to retrieve.
     * @return A ResponseEntity with the UserResponse and HTTP status OK.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    /**
     * Retrieves a list of all users.
     * 
     * @return A ResponseEntity with a list of UserResponse DTOs and HTTP status OK.
     */
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Deletes a user by their ID.
     * 
     * @param id The ID of the user to delete.
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    /**
     * Creates a new user.
     * 
     * @param userRequest The DTO containing the new user information.
     * @return A ResponseEntity with the created UserResponse and HTTP status
     *         CREATED.
     */
    @PostMapping
    public ResponseEntity<Void> createUser(@Valid @RequestBody UserRequest userRequest) {
        userService.createUser(userRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Retrieves a user by their email address.
     * This endpoint is designed for internal service-to-service communication,
     * e.g., for authentication service to retrieve user details.
     * 
     * @param email The email address of the user to retrieve.
     * @return A ResponseEntity with the UserResponse and HTTP status OK.
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<UserResponse> getUserByEmail(@NotNull @PathVariable String email) {
        UserResponse user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    /**
     * Retrieves a user by their email address.
     * This endpoint is designed for internal service-to-service communication,
     * e.g., for authentication service to retrieve user details.
     * 
     * @param username The email address of the user to retrieve.
     * @return A ResponseEntity with the UserResponse and HTTP status OK.
     */
    @GetMapping("/username/{username}")
    public ResponseEntity<UserResponse> getUserByUsername(@PathVariable String username) {
        UserResponse user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }
}