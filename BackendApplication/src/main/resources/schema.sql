-- CREATE DATABASE onlinebank --

CREATE DATABASE IF NOT EXISTS onlinebank;

USE onlinebank;

-- CREATE TABLE FOR USERS --
CREATE TABLE
    IF NOT EXISTS users (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        phone_number VARCHAR(20) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        account_number BIGINT NOT NULL UNIQUE,
        address VARCHAR(255) NOT NULL,
        available_balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
        role VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- CREATE TABLE FOR BENEFICIARIES --
CREATE TABLE
    IF NOT EXISTS beneficiaries (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id BIGINT NOT NULL,
        name VARCHAR(255) NOT NULL,
        account_number BIGINT NOT NULL,
        bank_name VARCHAR(255) NOT NULL,
        max_transfer_limit DECIMAL(15, 2) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
    );

-- CREATE TABLE FOR TRANSACTIONS --
CREATE TABLE
    IF NOT EXISTS transactions (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        sender_id BIGINT NOT NULL,
        receiver_id BIGINT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        status VARCHAR(255) NOT NULL,
        FOREIGN KEY (sender_id) REFERENCES users (id), 
        FOREIGN KEY (receiver_id) REFERENCES users (id)
    );