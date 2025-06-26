package com.englishmate.auth_service.service;

import com.englishmate.auth_service.dto.request.LoginRequest;
import com.englishmate.auth_service.dto.request.SignupRequest;
import com.englishmate.auth_service.dto.response.JwtResponse;
import com.englishmate.auth_service.dto.response.MessageResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    JwtResponse login(LoginRequest loginRequest, HttpServletResponse response);
    MessageResponse register(SignupRequest signupRequest);
    JwtResponse refreshToken(String refreshTokenRequest);
    MessageResponse logout(String refreshToken);
} 