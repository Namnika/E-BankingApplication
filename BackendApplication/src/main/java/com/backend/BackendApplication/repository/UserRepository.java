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
	// find user by email
	Optional<User> findbyEmail(String email);

	// check if user exists by email
	boolean existsByEmail(String email);

	// find user by role (eg. CUSTOMER, ADMIN)
	List<User> findByRole(String role);

	// find users by name (case-insensitive)
	List<User> findByNameIgnoreCase(String name);

	// delete user by email
	void deleteByEmail(String email);
}
