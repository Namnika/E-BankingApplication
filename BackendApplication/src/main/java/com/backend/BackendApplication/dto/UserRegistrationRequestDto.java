package com.backend.BackendApplication.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegistrationRequestDto {
    // requesting data from client-side
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String fullName;
    private String address;

}
