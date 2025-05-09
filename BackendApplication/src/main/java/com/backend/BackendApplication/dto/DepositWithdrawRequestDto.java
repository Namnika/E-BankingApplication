package com.backend.BackendApplication.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepositWithdrawRequestDto {
    private BigDecimal amount;
}
