package com.chat.user_service.service.impl;

import com.chat.user_service.dto.request.LoginRequest;
import com.chat.user_service.dto.request.UpdateStatusRequest;
import com.chat.user_service.dto.request.UserRequest;
import com.chat.user_service.dto.response.UserResponse;
import com.chat.user_service.entity.User;
import com.chat.user_service.entity.enumerations.UserStatus;
import com.chat.user_service.exception.BadRequestException;
import com.chat.user_service.exception.user.UserNotFoundException;
import com.chat.user_service.repository.UserRepository;
import com.chat.user_service.service.UserService;
import com.chat.user_service.service.mapper.UserMapper;
import com.chat.user_service.constant.MessageErrorConstants;
import com.chat.user_service.utils.CommonUtils;
import lombok.RequiredArgsConstructor;
import org.hibernate.sql.Update;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Implementation of the UserService interface. Handles business logic for user management.
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    /**
     * Updates an existing user's information. Validates user existence and maps DTO to entity.
     *
     * @return The updated user's response DTO.
     * @throws UserNotFoundException if the user with the given ID is not found.
     */
    @Override
    public Boolean activeUser(UpdateStatusRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UserNotFoundException(MessageErrorConstants.USER_NOT_FOUND));
        user.setStatus(request.getStatus());
        userRepository.save(user);
        CommonUtils.updateAuditFields(user, user.getUsername());
        return Boolean.TRUE;
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param id The ID of the user to retrieve.
     * @return The user's response DTO.
     * @throws UserNotFoundException if the user with the given ID is not found.
     */
    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(MessageErrorConstants.USER_NOT_FOUND));
        return userMapper.toDto(user);
    }

    /**
     * Retrieves a list of all users.
     *
     * @return A list of user response DTOs.
     */
    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(userMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Deletes a user by their ID.
     *
     * @param id The ID of the user to delete.
     * @throws UserNotFoundException if the user with the given ID is not found.
     */
    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(MessageErrorConstants.USER_NOT_FOUND));
        userRepository.deleteById(id);
        CommonUtils.deleteAuditFields(user, user.getUsername());
    }


    /**
     * Creates a new user. Validates if a user with the given email already exists and encodes the password.
     *
     * @param userRequest The DTO containing the new user information.
     * @return The created user's response DTO.
     * @throws BadRequestException if a user with the given email already exists.
     */
    @Override
    public UserResponse createUser(UserRequest userRequest) {
        Optional<User> existingUser = userRepository.findByEmail(userRequest.getEmail());
        if (existingUser.isPresent()) {
            throw new BadRequestException(MessageErrorConstants.EMAIL_ALREADY_EXISTS);
        }
        User user = userMapper.toEntity(userRequest);
        user.setStatus(UserStatus.INACTIVE);
        user.setPoint(100);

        CommonUtils.createAuditFields(user, user.getUsername());
        User savedUser = userRepository.save(user);
        return userMapper.toDto(savedUser);
    }

    /**
     * @param email The email address of the user to retrieve.
     * @return DTO for user responses.
     */
    @Override
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(MessageErrorConstants.USER_NOT_FOUND));
        return userMapper.toDto(user);
    }

    /**
     * @param email The email address of the user to retrieve.
     * @return DTO for user responses.
     */
    @Override
    public UserResponse getUserByUsername(String email) {
        User user = userRepository.findByUsername(email).orElseThrow(() -> new UserNotFoundException(MessageErrorConstants.USER_NOT_FOUND));
        return userMapper.toDto(user);
    }
} 