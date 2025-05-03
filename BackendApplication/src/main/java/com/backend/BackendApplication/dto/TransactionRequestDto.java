package com.backend.BackendApplication.dto;
import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionRequestDto {
    private Long senderId;
    private Long receiverId;
    private BigDecimal amount;
}
