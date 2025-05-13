package com.backend.BackendApplication.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.BackendApplication.dto.LoginResponseDto;
import com.backend.BackendApplication.dto.UserLoginDto;
import com.backend.BackendApplication.dto.UserRegistrationDto;
import com.backend.BackendApplication.dto.UserResponseDto;
import com.backend.BackendApplication.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    // CREATE: Register a new user
    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody UserRegistrationDto dto) {
        UserResponseDto response = userService.registerUser(dto);
        return ResponseEntity.ok(response);
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody UserLoginDto dto) {
        LoginResponseDto response = userService.loginUser(dto);
        return ResponseEntity.ok(response);
    }

    // Get user by ID
    // Only the user themselves or admin can view/edit a profile
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.user.id")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        UserResponseDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    // Update user
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.user.id")
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id,
            @Valid @RequestBody UserRegistrationDto dto) {
        UserResponseDto response = userService.updateUser(id, dto);
        return ResponseEntity.ok(response);
    }

    // Delete user
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.user.id")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User deleted successfully");
        return ResponseEntity.ok(response);
    }

    // This endpoint can be used for both searching and getting all users only for
    // authenticated users
    @PreAuthorize("isAuthenticated()") // Any authenticated user can access this
    @GetMapping("/search")
    public ResponseEntity<List<UserResponseDto>> searchUsers(
            @RequestParam(required = false) String query) {
        if (query != null && !query.isEmpty()) {
            // If query is provided, search by name
            return ResponseEntity.ok(userService.searchUsersByFullName(query));
        }
        // If no query, return all users
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // This endpoint is specifically for admin to get all users
    // Only admin can view all users
    @PreAuthorize("hasRole('ADMIN')") // Only admin can access this
    @GetMapping("/all")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

}
