package com.backend.BackendApplication.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.BackendApplication.dto.UserLoginDto;
import com.backend.BackendApplication.dto.UserRegistrationDto;
import com.backend.BackendApplication.dto.UserResponseDto;
import com.backend.BackendApplication.model.User;
import com.backend.BackendApplication.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	// CREATE: Register a new user
	public UserResponseDto registerUser(UserRegistrationDto dto) { // (store user's data from registration page)

		// check if email already exists
		if (userRepository.existsByEmail(dto.getEmail())) {
			throw new RuntimeException("Email is already in use!");
		}

		// otherwise create new user

		User user = new User();
		user.setUsername(dto.getUsername());

		// HASH PASSWORDS !
		user.setPassword(dto.getPassword());
		user.setEmail(dto.getEmail());
		user.setPhoneNumber(dto.getPhoneNumber());
		user.setFullName(dto.getFullName());
		user.setAddress(dto.getAddress());
		user.setRole("CUSTOMER"); // default role

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

		user.setUsername(dto.getUsername());
		user.setEmail(dto.getEmail());
		user.setPhoneNumber(dto.getPhoneNumber());
		user.setFullName(dto.getFullName());
		user.setAddress(dto.getAddress());

		// Only update password if password available
		if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
			// hash password if possible
			user.setPassword(dto.getPassword());
		}

		User saved = userRepository.save(user);

		return mapToResponseDto(saved);

	}

	// Delete a user by ID
	public void deleteUser(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not Found!"));
		userRepository.delete(user);
	}

	// Login: Authenticate User
	public UserResponseDto loginUser(UserLoginDto dto) {
		Optional<User> userOpt = userRepository.findByEmail(dto.getEmailOrPhone());

		if (!userOpt.isPresent()) {
			userOpt = userRepository.findByPhoneNumber(dto.getEmailOrPhone());
		}

		User user = userOpt.orElseThrow(() -> new RuntimeException("Invalid Email or Phone Number!"));

		if (!dto.getPassword().equals(user.getPassword())) {
			throw new RuntimeException("Invalid Password!");
		}

		return mapToResponseDto(user);

	}

	// Search other users for adding beneficiaries (add in Bneficiary controller)
	public List<UserResponseDto> searchUsersByFullName(String fullName) {
		List<User> users = userRepository.findByFullNameIgnoreCase(fullName);

		return users.stream().map(this::mapToResponseDto).collect(Collectors.toList());
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
		return dto;
	}

}
