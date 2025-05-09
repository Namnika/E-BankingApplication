package com.backend.BackendApplication.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.backend.BackendApplication.dto.TransactionRequestDto;
import com.backend.BackendApplication.dto.TransactionResponseDto;
import com.backend.BackendApplication.dto.TransactionStatusUpdateDto;
import com.backend.BackendApplication.repository.TransactionRepository;
import com.backend.BackendApplication.repository.UserRepository;
import com.backend.BackendApplication.model.Transaction;
import com.backend.BackendApplication.model.User;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	private UserRepository userRepository;

	// CREATE: create a new transaction
	public TransactionResponseDto createTransaction(TransactionRequestDto dto) {
		User sender = userRepository.findById(dto.getSenderId())
				.orElseThrow(() -> new RuntimeException("Sender Not Found!"));

		User receiver = userRepository.findById(dto.getReceiverId())
				.orElseThrow(() -> new RuntimeException("Receiver Not Found!"));

		// Check if sender has sufficient balance
		if (sender.getAvailableBalance().compareTo(dto.getAmount()) < 0) {
			throw new RuntimeException("Insufficient balance!");
		}

		// Create transaction
		Transaction transaction = new Transaction();
		transaction.setTransactionSender(sender);
		transaction.setTransactionReceiver(receiver);
		transaction.setTransactionAmount(dto.getAmount());
		transaction.setTransactionStatus("PENDING");
		transaction.setTransactionDateTime(LocalDateTime.now());

		try {
			// update balances (try-catch)
			// debit from sender (deduct)

			sender.setAvailableBalance(sender.getAvailableBalance().subtract(dto.getAmount()));

			// credit to receiver (add)
			receiver.setAvailableBalance(receiver.getAvailableBalance().add(dto.getAmount()));

			// save updated user balances
			userRepository.save(sender);
			userRepository.save(receiver);

			// saved transaction
			Transaction saved = transactionRepository.save(transaction);

			return mapToResponseDto(saved);

		} catch (Exception e) {
			throw new RuntimeException("Transaction failed!" + e);
		}

	}

	// Method to deposit money
	public TransactionResponseDto depositMoney(Long userId, BigDecimal amount) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User Not Found!"));

		if (amount.compareTo(BigDecimal.ZERO) <= 0) {
			throw new RuntimeException("Deposit amount must be greater than zero!");
		}

		// Create deposit transaction
		Transaction transaction = new Transaction();
		transaction.setTransactionSender(user); // Self
		transaction.setTransactionReceiver(user); // Self
		transaction.setTransactionAmount(amount);
		transaction.setTransactionStatus("SUCCESS");
		transaction.setTransactionDateTime(LocalDateTime.now());

		user.setAvailableBalance(user.getAvailableBalance().add(amount));
		userRepository.save(user);

		Transaction saved = transactionRepository.save(transaction);
		return mapToResponseDto(saved);
	}

	// Method to withdraw money
	public TransactionResponseDto withdrawMoney(Long userId, BigDecimal amount) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User Not Found!"));

		if (amount.compareTo(BigDecimal.ZERO) <= 0) {
			throw new RuntimeException("Withdrawal amount must be greater than zero!");
		}

		// Check sufficient balance
		if (user.getAvailableBalance().compareTo(amount) < 0) {
			throw new RuntimeException("Insufficient balance for withdrawal!");
		}

		// Create withdrawal transaction
		Transaction transaction = new Transaction();
		transaction.setTransactionSender(user); // Self
		transaction.setTransactionReceiver(user); // Self
		transaction.setTransactionAmount(amount);
		transaction.setTransactionStatus("SUCCESS");
		transaction.setTransactionDateTime(LocalDateTime.now());

		// Update user balance
		user.setAvailableBalance(user.getAvailableBalance().subtract(amount));
		userRepository.save(user);

		Transaction saved = transactionRepository.save(transaction);
		return mapToResponseDto(saved);

	}

	// Method to check balance
	public BigDecimal checkBalance(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User Not Found!"));

		return user.getAvailableBalance();
	}

	// UPDATE: update transaction status
	public TransactionResponseDto updateTransactionStatus(Long id, TransactionStatusUpdateDto dto) {
		Transaction transaction = transactionRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Transaction Not Found!"));

		transaction.setTransactionStatus(dto.getStatus());

		Transaction saved = transactionRepository.save(transaction);

		return mapToResponseDto(saved);

	}

	// Get latest 10 transactions done by sender
	public List<TransactionResponseDto> findTop10TransactionBySender(Long id) {
		if (!userRepository.existsById(id)) {
			throw new RuntimeException("Sender Not Found!");
		}

		List<Transaction> transactions = transactionRepository.findTop10BySenderIdOrderByTransactionDateDesc(id);

		// Map to Dtos
		return transactions.stream().map(this::mapToResponseDto).collect(Collectors.toList());

	}

	// Get all transactions status
	public List<TransactionResponseDto> findTransactionStatus(String status) {

		try {
			List<Transaction> transactions = transactionRepository.findByStatus(status);

			// Map to Dtos
			return transactions.stream().map(this::mapToResponseDto).collect(Collectors.toList());
		} catch (IllegalArgumentException e) {
			throw new RuntimeException("Invalid Transaction Status" + status);
		}
	}

	// Get transactions greater than amount
	public List<TransactionResponseDto> findTransactionAboveAmount(BigDecimal amount) {
		// Validate amount
		if (amount.compareTo(BigDecimal.ZERO) <= 0) {
			throw new RuntimeException("Amount must be greater than zero!");
		}

		// List all transactions
		List<Transaction> transactions = transactionRepository.findByAmountGreaterThan(amount);

		// Map to DTOs
		return transactions.stream()
				.map(this::mapToResponseDto)
				.collect(Collectors.toList());

	}

	// get transactions done by sender with date range
	public List<TransactionResponseDto> findTransactionsBySenderAndDateRange(
			Long senderId,
			LocalDateTime startDate,
			LocalDateTime endDate) {
		// Validate sender exists
		if (!userRepository.existsById(senderId)) {
			throw new RuntimeException("Sender not found!");
		}

		if (startDate.isAfter(endDate)) {
			throw new RuntimeException("Start date must be before end date!");
		}

		// Find Transactions in date Range
		List<Transaction> transactions = transactionRepository.findBySenderIdAndTransactionDateBetween(senderId,
				startDate, endDate);

		// Map to DTOs
		return transactions.stream()
				.map(this::mapToResponseDto)
				.collect(Collectors.toList());

	}

	// Helper method to map Transaction to TransactionResponseDto
	private TransactionResponseDto mapToResponseDto(Transaction transaction) {

		TransactionResponseDto response = new TransactionResponseDto();

		response.setId(transaction.getTransactionId());
		response.setSenderName(transaction.getTransactionSender().getFullName());
		response.setReceiverName(transaction.getTransactionReceiver().getFullName());
		response.setAmount(transaction.getTransactionAmount());
		response.setStatus(transaction.getTransactionStatus());
		response.setTransactionDate(transaction.getTransactionDateTime());

		return response;
	}

}
