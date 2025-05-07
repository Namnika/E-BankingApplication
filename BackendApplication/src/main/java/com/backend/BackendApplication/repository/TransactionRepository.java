package com.backend.BackendApplication.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.BackendApplication.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Find all transactions sent by a user in a date range (as sender)
    List<Transaction> findBySenderIdAndTransactionDateBetween(Long senderId, LocalDateTime start, LocalDateTime end);

    // find all transactions with a specific status (e.g., SUCCESS, FAILED)
    List<Transaction> findByStatus(String status);

    // find transactions above a certain amount
    List<Transaction> findByAmountGreaterThan(BigDecimal amount);

    // Get a latest 10 transaction for a user (as sender)
    List<Transaction> findTop10BySenderIdOrderByTransactionDateDesc(Long senderId);
}
