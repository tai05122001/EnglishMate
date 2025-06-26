package com.englishmate.auth_service.filter;

import com.englishmate.auth_service.constant.ErrorCodeConstant;
import com.englishmate.auth_service.dto.user.UserAuthDto;
import com.englishmate.auth_service.exception.BadRequestException;
import com.englishmate.auth_service.exception.JwtAuthenticationException;
import com.englishmate.auth_service.service.UserServiceClient;
import com.englishmate.common_service.utils.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@RequiredArgsConstructor
@Slf4j
@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserServiceClient userServiceClient;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String uri = request.getRequestURI();
            if (uri.startsWith("/api/public/auth/")) {
                filterChain.doFilter(request, response);
                return;
            }
            log.info("AuthTokenFilter called for: {}", request.getRequestURI());
            String jwt = parseJwt(request);
            if (!StringUtils.hasLength(jwt) || !StringUtils.hasText(jwt)) {
                throw new JwtAuthenticationException("Access token is empty", ErrorCodeConstant.AUTH_ERROR_TOKEN_INVALID);
            }
            if (jwtUtils.validateJwtToken(jwt)) {
                String email = jwtUtils.getUserNameFromJwtToken(jwt);
                UserAuthDto userAuthDto = userServiceClient.getUserByEmail(email).block();
                if (Objects.isNull(userAuthDto)) {
                    throw new BadRequestException("Email is not exist", ErrorCodeConstant.VALIDATION_INVALID_EMAIL);
                }
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userAuthDto.getEmail(), null, userAuthDto.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.debug("Set authentication for user: {}", email);
                filterChain.doFilter(request, response);
            }

        } catch (Exception e) {
            log.error("Cannot set user authentication: {}", e.getMessage(), e);
            throw e;
        }
        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }

        return null;
    }
} 