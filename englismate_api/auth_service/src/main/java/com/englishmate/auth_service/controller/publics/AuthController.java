package com.englishmate.auth_service.controller.publics;

import com.englishmate.auth_service.dto.request.LoginRequest;
import com.englishmate.auth_service.dto.request.SignupRequest;
import com.englishmate.auth_service.dto.response.JwtResponse;
import com.englishmate.auth_service.dto.response.MessageResponse;
import com.englishmate.auth_service.exception.BadRequestException;
import com.englishmate.auth_service.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public/auth")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        JwtResponse jwtResponse = authService.login(loginRequest, response);
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> register(@Valid @RequestBody SignupRequest signupRequest) {
        MessageResponse messageResponse = authService.register(signupRequest);
        return ResponseEntity.ok(messageResponse);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<Object> refreshToken(
            @CookieValue("refreshToken") String refreshToken,
            HttpServletRequest request) {
        try {
            JwtResponse jwtResponse = authService.refreshToken(refreshToken);

            return ResponseEntity.ok(jwtResponse);
        } catch (BadRequestException e ){
            MessageResponse messageResponse = MessageResponse.builder().message("Refresh token is not expired").build();
            return ResponseEntity.badRequest().body(messageResponse);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageResponse> logout(@CookieValue("refreshToken") String refreshToken) {

        MessageResponse messageResponse = authService.logout(refreshToken);
        return ResponseEntity.ok(messageResponse);
    }

} 