package com.englishmate.common_service.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${user-service.base-url}") // Get base URL from application.properties
    private String userServiceBaseUrl;

    @Value("${auth-service.base-url}") // Get base URL from application.properties
    private String authServiceBaseUrl;

    @Bean(name = "webClientUser")
    public WebClient webClientUser(WebClient.Builder builder) {
        return builder
                .baseUrl(userServiceBaseUrl)
                .build();
    }

    @Bean(name = "webClientAuth")
    public WebClient webClientAuth(WebClient.Builder builder) {
        return builder
                .baseUrl(authServiceBaseUrl)
                .build();
    }
} 