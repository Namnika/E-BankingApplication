package com.backend.BackendApplication.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    public String getJwtSecret() {
        return jwtSecret;
    }

    public Long getJwtExpiration() {
        return jwtExpiration;
    }
} 