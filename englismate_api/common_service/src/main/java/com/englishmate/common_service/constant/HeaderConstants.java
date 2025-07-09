package com.englishmate.common_service.constant;

import org.springframework.http.HttpHeaders;

import java.util.List;

public final class HeaderConstants {

    private HeaderConstants() {}

    public static final String CONTENT_TYPE = "Content-Type";
    public static final String AUTHORIZATION = "Authorization";
    public static final String USER_AGENT = HttpHeaders.USER_AGENT;
    public static final String X_CURRENT_USER_LOGIN = "x-current-user-login";
    public static final String X_TOTAL_COUNT = "x-total-count";
    public static final String X_PLATFORM = "x-platform";
    public static final String X_USER_SESSION_ID = "X-User-Session-Id";
    public static final String X_ADMIN_SESSION_ID = "X-Admin-Session-Id";

    public static final String X_PARTNER_SESSION_ID = "X-Partner-Session-Id";
    public static final String X_API_KEY = "X-Api-Key";
    public static final String LINK_FORMAT = "<{0}>; rel=\"{1}\"";
    public static final String LINK = "link";
    public static final String ACCESS_CONTROL_EXPOSE_HEADERS = "access-control-expose-headers";
    public static final String APPLICATION_JSON = "application/json";
    public static final String PAYPAL_REQUEST_ID = "PayPal-Request-Id";
    public static final String LANDING_AUTHENTICATION = "loggedin";
    public static final String CF_COUNTRY_CODE = "cf-ipcountry";
    public static final String CF_CITY_CODE = "cf-ipcity";
    public static final String COOKIE_REFFERAL_CODE = "referral-code";
    public static final List <String> IP_HEADER_CANDIDATES = List.of(
            "True-Client-IP",
            "CF-Connecting-IP",
            "X-Forwarded-For",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR",
            "X-Real-IP"
    );
}
