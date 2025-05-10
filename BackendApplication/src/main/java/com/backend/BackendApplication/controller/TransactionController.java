package com.backend.BackendApplication.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.BackendApplication.service.TransactionService;

import jakarta.validation.Valid;

import com.backend.BackendApplication.dto.DepositWithdrawRequestDto;
import com.backend.BackendApplication.dto.TransactionRequestDto;
import com.backend.BackendApplication.dto.TransactionResponseDto;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

	@Autowired
	private TransactionService transactionService;

	// Create new transaction
	@PostMapping("/transfer")
	public ResponseEntity<TransactionResponseDto> createTransaction(
			@Valid @RequestBody TransactionRequestDto requestDto) {
		TransactionResponseDto response = transactionService.createTransaction(requestDto);
		return ResponseEntity.ok(response);
	}

	// Get top 10 latest transactions (display on transactions's page)
	@GetMapping("/users/{senderId}/latest")
	public ResponseEntity<List<TransactionResponseDto>> getLatestTransactions(@PathVariable Long senderId) {
		return ResponseEntity.ok(transactionService.findTop10TransactionBySender(senderId));
	}

	// Deposit money
	@PostMapping("/deposit/{userId}")
	public ResponseEntity<TransactionResponseDto> depositMoney(
			@PathVariable Long userId,
			@Valid @RequestBody DepositWithdrawRequestDto request) {
		return ResponseEntity.ok(transactionService.depositMoney(userId, request.getAmount()));
	}

	// Withdraw money
	@PostMapping("/withdraw/{userId}")
	public ResponseEntity<TransactionResponseDto> withdrawMoney(@PathVariable Long userId,
			@Valid @RequestBody DepositWithdrawRequestDto request) {
		return ResponseEntity.ok(transactionService.withdrawMoney(userId, request.getAmount()));
	}

	// Get net balance (display only text)
	@GetMapping("/api/balance/{userId}")
	public ResponseEntity<Map<String, Object>> checkBalance(@PathVariable Long userId) {
		BigDecimal balance = transactionService.checkBalance(userId);
		Map<String, Object> response = new HashMap<>();
		response.put("balance", balance);
		response.put("message", "Balance retrieved successfully");
		return ResponseEntity.ok(response);
	}

	// Get all transactions status
	/*
	 * GET /transactions/status/SUCCESS - Get all successful transactions
	 * GET /transactions/status/FAILED - Get all failed transactions
	 * GET /transactions/status/PENDING - Get all pending transactions
	 */

	@GetMapping("/status/{status}")
	public ResponseEntity<List<TransactionResponseDto>> getTransactionByStatus(@PathVariable String status) {
		return ResponseEntity.ok(transactionService.findTransactionStatus(status));
	}

	// Get transactions greater than amount
	/*
	 * eg: GET /transactions/amount?amount=1000.00 - Get all transactions above
	 * $1000
	 * GET /transactions/amount?amount=500.50 - Get all transactions above $500.50
	 */

	@GetMapping("/amount")
	public ResponseEntity<List<TransactionResponseDto>> getTransactionAmount(@RequestParam BigDecimal amount) {
		return ResponseEntity.ok(transactionService.findTransactionAboveAmount(amount));
	}

	// Get transactions done by sender with date range
	/*
	 * eg: GET /transactions/sender/1?startDate=2023-01-01T00:00:00 - Get all
	 * transactions done by sender 1 on or after 2023-01-01T00:00:00
	 * 
	 */
	@GetMapping("/sender/{senderId}")
	public ResponseEntity<List<TransactionResponseDto>> getTransactionsBySenderAndDateRange(
			@PathVariable Long senderId,
			@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") LocalDateTime startDate,
			@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") LocalDateTime endDate) {
		return ResponseEntity.ok(transactionService.findTransactionsBySenderAndDateRange(senderId, startDate, endDate));
	}

}
