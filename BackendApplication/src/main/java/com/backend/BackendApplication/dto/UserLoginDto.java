package com.backend.BackendApplication.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserLoginDto {
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    @NotBlank(message = "Phone number cannot be empty")
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "Invalid phone number format")
    private String emailOrPhone; // either checks phone number or email for login

    @NotBlank(message = "Password cannot be empty")
    private String password;
}
