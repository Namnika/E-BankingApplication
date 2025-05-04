package com.backend.BackendApplication.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginDto {
    private String emailOrPhone; // either checks phone number or email for login
    private String passwordd;
}
