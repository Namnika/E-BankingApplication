package com.backend.BackendApplication.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")

public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "sender_id", nullable = false)
	private User sender;

	@ManyToOne
	@JoinColumn(name = "receiver_id", nullable = false)
	private User receiver;

	private BigDecimal amount;

	@Column(name = "transaction_date")
	private LocalDateTime transactionDate;

	private String status;

	// getters and setters to modify the fields

	public Long getTransactionId() {
		return id;
	}

	public void setTransactionId(Long id) {
		this.id = id;
	}

	public User getTransactionSender() {
		return sender;
	}

	public void setTransactionSender(User sender) {
		this.sender = sender;
	}

	public User getTransactionReceiver() {
		return receiver;
	}

	public void setTransactionReceiver(User receiver) {
		this.receiver = receiver;
	}

	public BigDecimal getTransactionAmount() {
		return amount;
	}

	public void setTransactionAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public LocalDateTime getTransactionDateTime() {
		return transactionDate;
	}

	public void setTransactionDateTime(LocalDateTime transactionDate) {
		this.transactionDate = transactionDate;
	}

	public String getTransactionStatus() {
		return status;
	}

	public void setTransactionStatus(String status) {
		this.status = status;
	}
}
