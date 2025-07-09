package com.englishmate.auth_service.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.DeserializationFeature;
import feign.codec.Decoder;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.ResponseEntityDecoder;
import org.springframework.cloud.openfeign.support.SpringDecoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import feign.Logger;
import feign.codec.ErrorDecoder;
import feign.Request;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

/**
 * Configuration for Feign clients
 * Sets up logging, timeouts, and error handling
 */
@Configuration
public class FeignClientConfig {

    @Value("${feign.client.config.default.connectTimeout:5000}")
    private int connectTimeout;

    @Value("${feign.client.config.default.readTimeout:10000}")
    private int readTimeout;

    /**
     * Configure Feign client logging level
     * 
     * @return Logger.Level for Feign client
     */
    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }

    /**
     * Configure request options for Feign client
     * 
     * @return Request.Options with connect and read timeouts
     */
    @Bean
    public Request.Options requestOptions() {
        return new Request.Options(connectTimeout, readTimeout);
    }

    /**
     * Configure custom ObjectMapper for handling JSON deserialization
     * 
     * @return ObjectMapper configured for tolerant parsing
     */
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        return objectMapper;
    }

    /**
     * Configure custom decoder for Feign client
     * 
     * @return Custom decoder that uses the configured ObjectMapper
     */
    @Bean
    public Decoder feignDecoder() {
        ObjectMapper customObjectMapper = objectMapper();
        MappingJackson2HttpMessageConverter jacksonConverter = new MappingJackson2HttpMessageConverter(
                customObjectMapper);
        ObjectFactory<HttpMessageConverters> objectFactory = () -> new HttpMessageConverters(jacksonConverter);
        return new ResponseEntityDecoder(new SpringDecoder(objectFactory));
    }

    /**
     * Configure error decoder for Feign client
     * 
     * @return CustomErrorDecoder for handling error responses
     */
    @Bean
    public ErrorDecoder errorDecoder() {
        return new CustomErrorDecoder();
    }

    /**
     * Custom error decoder for handling error responses
     * Translates HTTP error responses to appropriate exceptions
     */
    public class CustomErrorDecoder implements ErrorDecoder {
        private final ErrorDecoder defaultErrorDecoder = new Default();

        @Override
        public Exception decode(String methodKey, feign.Response response) {
            // Default error handling for now
            // Can be customized to map HTTP errors to specific exceptions
            return defaultErrorDecoder.decode(methodKey, response);
        }
    }
}