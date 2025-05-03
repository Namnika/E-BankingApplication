package com.backend.BackendApplication.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class TransactionResponseDto {
    private Long id;
    private String senderName;
    private String receiverName;
    private BigDecimal amount;
    private LocalDateTime transactionDate;
    private String status;
    
}
