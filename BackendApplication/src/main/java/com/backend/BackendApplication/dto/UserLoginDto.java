package com.backend.BackendApplication.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserLoginDto {

    @NotBlank(message = "Email or phone number cannot be empty")
    private String emailOrPhone; // either checks phone number or email for login

    @NotBlank(message = "Password cannot be empty")
    private String password;

    private String role = "CUSTOMER"; // Default role is CUSTOMER
}
