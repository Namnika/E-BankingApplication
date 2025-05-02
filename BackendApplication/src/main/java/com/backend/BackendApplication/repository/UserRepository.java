package com.backend.BackendApplication.repository;

import com.backend.BackendApplication.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

// Spring Data JPA automatically implements these methods based on their names.
// can use these methods in service and controller layers for various user-related operations.

public interface UserRepository extends JpaRepository<User, Long> {

}
