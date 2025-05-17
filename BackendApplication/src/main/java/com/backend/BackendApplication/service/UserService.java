package com.backend.BackendApplication.service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.security.access.AccessDeniedException;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.BackendApplication.config.JwtConfig;
import com.backend.BackendApplication.dto.LoginResponseDto;
import com.backend.BackendApplication.dto.UserLoginDto;
import com.backend.BackendApplication.dto.UserRegistrationDto;
import com.backend.BackendApplication.dto.UserResponseDto;
import com.backend.BackendApplication.model.User;
import com.backend.BackendApplication.repository.UserRepository;
import com.backend.BackendApplication.security.CustomUserDetails;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtConfig jwtConfig;

	// Add this method to generate account number
	private String generateAccountNumber() {
		// Generate a 10-digit account number
		String accountNumber = String.format("%010d", (long) (Math.random() * 10000000000L));

		// Check if account number already exists
		while (userRepository.existsByAccountNumber(accountNumber)) {
			accountNumber = String.format("%010d", (long) (Math.random() * 10000000000L));
		}

		return accountNumber;
	}

	// CREATE: Register a new user
	public UserResponseDto registerUser(UserRegistrationDto dto) { // (store user's data from registration page)

		// check if email already exists
		if (userRepository.existsByEmail(dto.getEmail())) {
			throw new RuntimeException("Email is already in use!");
		}

		// Hash the password before saving
		String hashedPassword = passwordEncoder.encode(dto.getPassword());
		// otherwise create new user

		User user = new User();
		user.setUsername(dto.getUsername());

		// HASH PASSWORDS !
		user.setPassword(hashedPassword);
		user.setEmail(dto.getEmail());
		user.setPhoneNumber(dto.getPhoneNumber());
		user.setFullName(dto.getFullName());
		user.setAddress(dto.getAddress());
		user.setRole("CUSTOMER"); // default role
		user.setAccountNumber(generateAccountNumber()); // automatically the backend will generate account number for
														// user
		user.setAvailableBalance(BigDecimal.ZERO); // Initialize balance to zero
		user.setDateTime(LocalDateTime.now()); // to set user creation timestamp

		User saved = userRepository.save(user);

		return mapToResponseDto(saved);
	}

	// READ: Read a User
	public UserResponseDto getUserById(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found!"));
		return mapToResponseDto(user);
	}

	// UPDATE: Update user details
	public UserResponseDto updateUser(Long id, UserRegistrationDto dto) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not Found!"));

		// Update only the fields that are not null
		if (dto.getUsername() != null) {
			user.setUsername(dto.getUsername());
		}
		if (dto.getEmail() != null) {
			user.setEmail(dto.getEmail());
		}
		if (dto.getPhoneNumber() != null) {
			user.setPhoneNumber(dto.getPhoneNumber());
		}
		if (dto.getFullName() != null) {
			user.setFullName(dto.getFullName());
		}
		if (dto.getAddress() != null) {
			user.setAddress(dto.getAddress());
		}
		if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
			user.setPassword(passwordEncoder.encode(dto.getPassword()));
		}

		User saved = userRepository.save(user);

		return mapToResponseDto(saved);

	}

	// Delete a user by ID
	public void deleteUser(Long id) {
		// Get current authenticated user
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		Long currentUserId = userDetails.getUser().getId();
		String currentUserRole = userDetails.getUser().getRole();

		// Find user to be deleted
		User userToDelete = userRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("User not found"));

		// Check if user is admin or deleting their own account
		if (!currentUserRole.equals("ADMIN") && !currentUserId.equals(id)) {
			throw new AccessDeniedException("You don't have permission to delete this user");
		}

		// Additional check: Prevent admin from deleting themselves
		if (currentUserRole.equals("ADMIN") && currentUserId.equals(id)) {
			throw new RuntimeException("Admin cannot delete their own account");
		}

		// Delete the user
		userRepository.delete(userToDelete);
	}

	// Login: Authenticate User

	public boolean validateUser(String rawPassword, String hashedPassword) {
		return passwordEncoder.matches(rawPassword, hashedPassword);
	}

	public LoginResponseDto loginUser(UserLoginDto dto) {
		Optional<User> userOpt = null;

		// Check if input is email format
		if (dto.getEmailOrPhone().contains("@")) {
			userOpt = userRepository.findByEmail(dto.getEmailOrPhone());
		} else {
			// If not email, try as phone number
			userOpt = userRepository.findByPhoneNumber(dto.getEmailOrPhone());
		}

		User user = userOpt.orElseThrow(() -> new RuntimeException("Invalid Email or Phone Number!"));

		// 2. Validate password
		if (!validateUser(dto.getPassword(), user.getPassword())) {
			throw new RuntimeException("Invalid password");
		}

		// Generate JWT token
		String token = generateToken(user);

		// Create response with token and user info
		LoginResponseDto response = new LoginResponseDto();
		response.setToken(token);
		response.setUser(mapToResponseDto(user));

		return response;

	}

	private String generateToken(User user) {
		Key key = Keys.hmacShaKeyFor(jwtConfig.getJwtSecret().getBytes());
		String token = Jwts.builder()
				.setSubject(user.getUsername())
				.claim("userId", user.getId())
				.claim("role", user.getRole())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getJwtExpiration()))
				.signWith(key)
				.compact();
		return token;
	}

	// Search other users for adding beneficiaries (add in Beneficiary controller )
	public List<UserResponseDto> searchUsersByFullName(String fullName) {
		List<User> users = userRepository.findByFullNameIgnoreCase(fullName);

		return users.stream().map(this::mapToResponseDto).collect(Collectors.toList());
	}

	// to get all users by admin
	public List<UserResponseDto> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users.stream()
				.map(this::mapToResponseDto)
				.collect(Collectors.toList());
	}

	// Helper method: Map user to UserResponseDto (display user's data in
	// registration page)
	private UserResponseDto mapToResponseDto(User user) {
		UserResponseDto dto = new UserResponseDto();

		dto.setId(user.getId());
		dto.setUsername(user.getUsername());
		dto.setEmail(user.getEmail());
		dto.setPhoneNumber(user.getPhoneNumber());
		dto.setFullName(user.getFullName());
		dto.setAddress(user.getAddress());
		dto.setRole(user.getRole());
		dto.setAccountNumber(user.getAccountNumber());
		dto.setAvailableBalance(user.getAvailableBalance());
		dto.setCreatedAt(user.getDateTime());
		return dto;
	}

}
