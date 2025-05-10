package com.backend.BackendApplication.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class TransactionStatusUpdateDto {
    @NotNull
    private String status;
}
