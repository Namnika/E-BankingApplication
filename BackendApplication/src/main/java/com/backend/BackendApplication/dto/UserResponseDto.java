package com.backend.BackendApplication.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto {
    // sending data to client-side
    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    private String accountNumber;
    private String fullName;
    private String address;
    private String role;
    private LocalDateTime createdAt;
    private BigDecimal availableBalance;
}
