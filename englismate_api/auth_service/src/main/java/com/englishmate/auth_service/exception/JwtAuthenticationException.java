package com.englishmate.auth_service.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@Setter
@Getter
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class JwtAuthenticationException extends AuthenticationException {
  private final String errorCode;

  public JwtAuthenticationException(String msg, String errorCode) {
    super(msg);
    this.errorCode = errorCode;
  }

  public String getErrorCode() {
    return errorCode;
  }
}
