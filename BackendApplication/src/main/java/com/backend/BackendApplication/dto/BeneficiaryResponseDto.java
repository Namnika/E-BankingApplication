package com.backend.BackendApplication.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class BeneficiaryResponseDto {

    @NotNull
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String accountNumber;

    @NotNull
    private String bankName;

    @NotNull
    @DecimalMax(value = "1000000.00", message = "Amount cannot exceed 1,000,000")
    private Double maxTransferLimit;
}
