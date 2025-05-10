package com.backend.BackendApplication;

import java.sql.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;

// checking the connection of java application with MySQL Database

@SpringBootApplication
@RestController
public class BackendApplication {

	@Value("${spring.datasource.url}")
	private String dbUrl;

	@Value("${spring.datasource.username}")
	private String dbUsername;

	@Value("${spring.datasource.password}")
	private String dbPassword;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@GetMapping("/hello-world")
	public String root() {
		return "Hello World!";
	}

	@PostConstruct
	public void init() {
		try (Connection con = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
			System.out.println("Connected Successfully!");
		} catch (SQLException e) {
			System.err.println("Database connection failed: " + e.getMessage());
		}
	}

}
