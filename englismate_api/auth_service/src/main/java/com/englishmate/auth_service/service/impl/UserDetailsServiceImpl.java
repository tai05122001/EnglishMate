package com.englishmate.auth_service.service.impl;

import com.englishmate.common_service.dto.response.UserAuthDto;
import com.englishmate.common_service.service.UserServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserServiceClient userServiceClient;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserAuthDto userAuthDto = userServiceClient.getUserByEmail(email).block();

        if (userAuthDto == null) {
            throw new UsernameNotFoundException("User Not Found with username or email: " + email);
        }

        return new User(userAuthDto.getEmail(),
                userAuthDto.getPassword(),
                userAuthDto.getRoles()
                        .stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList()));
    }
} 