package com.backend.BackendApplication.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

@Data
@Getter
@Setter
public class TransactionResponseDto {
    @NotNull
    private Long id;

    @NotNull
    private Long senderId;

    @NotNull
    private String senderName;

    @NotNull
    private String receiverName;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal amount;

    @NotNull
    private LocalDateTime transactionDate;

    @NotNull
    private String status;

}
