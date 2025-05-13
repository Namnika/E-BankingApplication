package com.backend.BackendApplication.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LoginResponseDto {
    private String token;
    private UserResponseDto user;
}