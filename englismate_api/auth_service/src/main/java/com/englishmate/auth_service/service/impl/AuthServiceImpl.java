package com.englishmate.auth_service.service.impl;

import com.englishmate.auth_service.constant.ErrorCodeConstant;
import com.englishmate.auth_service.constant.MessageErrorConstants;
import com.englishmate.auth_service.dto.request.LoginRequest;
import com.englishmate.auth_service.dto.request.SignupRequest;
import com.englishmate.auth_service.dto.request.UpdateStatusRequest;
import com.englishmate.auth_service.dto.request.UserCreationRequest;
import com.englishmate.auth_service.dto.response.JwtResponse;
import com.englishmate.auth_service.dto.response.MessageResponse;
import com.englishmate.auth_service.dto.user.UserAuthDto;
import com.englishmate.auth_service.entity.RefreshToken;
import com.englishmate.auth_service.exception.BadRequestException;
import com.englishmate.auth_service.repository.RefreshTokenRepository;
import com.englishmate.auth_service.service.AuthService;
import com.englishmate.auth_service.service.UserServiceClient;
import com.englishmate.common_service.utils.JwtUtils;
import com.englishmate.auth_service.utils.CommonUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AuthServiceImpl implements AuthService {

    private final JwtUtils jwtUtils;
    private final UserServiceClient userServiceClient;
    private final PasswordEncoder encoder;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${jwt.expiration.ms}")
    private int jwtExpirationMs;

    @Override
    @Transactional
    public JwtResponse login(LoginRequest loginRequest, HttpServletResponse response) {
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty()) {
            throw new BadRequestException(MessageErrorConstants.EMAIL_CANNOT_BE_EMPTY, ErrorCodeConstant.VALIDATION_REQUIRED_FIELD);
        }

        if (loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            throw new BadRequestException(MessageErrorConstants.PASSWORD_CANNOT_BE_EMPTY, ErrorCodeConstant.VALIDATION_REQUIRED_FIELD);
        }

        UserAuthDto userAuthDto = userServiceClient.getUserByEmail(loginRequest.getEmail()).block();
        if (Objects.isNull(userAuthDto)) {
            throw new BadRequestException(MessageErrorConstants.USER_WITH_EMAIL_NOT_EXISTS, ErrorCodeConstant.VALIDATION_INVALID_EMAIL);
        }

        if (!encoder.matches(loginRequest.getPassword(), userAuthDto.getPassword())) {
            throw new BadRequestException(MessageErrorConstants.INVALID_EMAIL_OR_PASSWORD, ErrorCodeConstant.AUTH_ERROR_UNAUTHORIZED);
        }
        Boolean isUpdate = userServiceClient.updateStatusUser(UpdateStatusRequest.builder().email(loginRequest.getEmail()).status("ACTIVE").build()).block();
        if (Boolean.TRUE.equals(isUpdate)) {
            this.setRefreshTokenIntoCookie(response, createRefreshToken(loginRequest.getEmail()));
            String jwt = jwtUtils.generateJwtToken(userAuthDto.getEmail());
            return JwtResponse.builder().token(jwt).type("Bearer").email(userAuthDto.getEmail()).username(userAuthDto.getUsername()).roles(userAuthDto.getRoles()).build();
        }
        throw new BadRequestException(MessageErrorConstants.USER_WITH_CHANGE_STATUS_ERROR, ErrorCodeConstant.USER_ERROR_INVALID_STATUS);

    }

    @Transactional
    @Override
    public JwtResponse refreshToken(String refreshToken) {
        RefreshToken token = refreshTokenRepository.findByToken(refreshToken).orElseThrow(() -> new BadRequestException(MessageErrorConstants.REFRESH_TOKEN_NOT_FOUND, ErrorCodeConstant.AUTH_ERROR_UNAUTHORIZED));

        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new BadRequestException(MessageErrorConstants.REFRESH_TOKEN_EXPIRED, ErrorCodeConstant.AUTH_ERROR_TOKEN_INVALID);
        }

        UserAuthDto userAuthDto = userServiceClient.getUserByEmail(token.getEmail()).block();
        if (Objects.isNull(userAuthDto)) {
            throw new BadRequestException(MessageErrorConstants.USER_ASSOCIATED_WITH_REFRESH_TOKEN_NOT_FOUND, ErrorCodeConstant.USER_ERROR_NOT_FOUND);
        }

        String newAccessToken = jwtUtils.generateJwtToken(userAuthDto.getEmail());
        return JwtResponse.builder().token(newAccessToken).type("Bearer").email(userAuthDto.getEmail()).username(userAuthDto.getUsername()).token(newAccessToken).roles(userAuthDto.getRoles()).build();
    }

    /**
     * @param response
     * @param token
     */
    private void setRefreshTokenIntoCookie(HttpServletResponse response, RefreshToken token) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", token.getToken()).httpOnly(true).secure(true).path("/").maxAge(3600).build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    /**
     * @param email
     * @return
     */
    public RefreshToken createRefreshToken(String email) {
        RefreshToken refreshToken = RefreshToken.builder().email(email).token(UUID.randomUUID().toString()).expiryDate(Instant.now().plusMillis(jwtExpirationMs * 4L)).build();
        CommonUtils.createAuditFields(refreshToken, email);
        return refreshTokenRepository.save(refreshToken);
    }

    /**
     * @param signupRequest
     * @return
     */
    @Override
    public MessageResponse register(SignupRequest signupRequest) {
        Set<String> roles = new HashSet<>();
        if (signupRequest.getRoles() != null && !signupRequest.getRoles().isEmpty()) {
            roles = signupRequest.getRoles();
        } else {
            roles.add("ROLE_USER");
        }

        UserCreationRequest userCreationRequest = UserCreationRequest.builder().email(signupRequest.getEmail()).password(encoder.encode(signupRequest.getPassword())).fullName(signupRequest.getUsername()).roles(roles).packageType("FREE").build();

        UserAuthDto createdUser = userServiceClient.createUser(userCreationRequest).block();

        if (createdUser != null) {
            return MessageResponse.builder().message(MessageErrorConstants.USER_REGISTERED_SUCCESSFULLY).build();
        } else {
            throw new BadRequestException(MessageErrorConstants.FAILED_TO_REGISTER_USER, ErrorCodeConstant.SYSTEM_INTERNAL_ERROR);
        }
    }

    @Override
    @Transactional
    public MessageResponse logout(String refreshToken) {
        RefreshToken token = refreshTokenRepository.findByToken(refreshToken).orElseThrow(() -> new BadRequestException(MessageErrorConstants.REFRESH_TOKEN_NOT_FOUND, ErrorCodeConstant.AUTH_ERROR_UNAUTHORIZED));
        Boolean isUpdate = userServiceClient.updateStatusUser(UpdateStatusRequest.builder().email(token.getEmail()).status("INACTIVE").build()).block();
        if (isUpdate) {
            CommonUtils.deleteAuditFields(token, token.getEmail());
            refreshTokenRepository.delete(token);
            return MessageResponse.builder().message(MessageErrorConstants.LOGOUT_SUCCESSFUL).build();
        }
        throw new BadRequestException(MessageErrorConstants.USER_WITH_CHANGE_STATUS_ERROR, ErrorCodeConstant.USER_ERROR_INVALID_STATUS);
    }
}