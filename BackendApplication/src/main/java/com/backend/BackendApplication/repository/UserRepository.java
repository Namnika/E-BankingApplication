package com.backend.BackendApplication.repository;

import com.backend.BackendApplication.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

// Spring Data JPA automatically implements these methods based on their names.
// can use these methods in service and controller layers for various user-related operations.

public interface UserRepository extends JpaRepository<User, Long> {

	// Standard CRUD Methods Provided by JpaRepository such as
	// save(entity) provide functionalities:
	// 1. create user
	// 2. update user

	// Custom Methods/Queries:
	// find user by username (used for CustomUserDetailsService)
	Optional<User> findByUsername(String username);

	// find user by email (ex. login)
	Optional<User> findByEmail(String email);

	// find user by phone number (ex. login)
	Optional<User> findByPhoneNumber(String phoneNumber);

	// check if user exists by email
	boolean existsByEmail(String email);

	// check if user exists by account number
	boolean existsByAccountNumber(String accountNumber);

	// find all users by fullName (case-insensitive)
	List<User> findByFullNameIgnoreCase(String fullName);

}
