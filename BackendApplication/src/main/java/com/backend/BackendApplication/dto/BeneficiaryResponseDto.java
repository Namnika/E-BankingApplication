package com.backend.BackendApplication.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BeneficiaryResponseDto {
    private Long id;
    private String name;
    private String accountNumber;
    private String bankName;
    private Double maxTransferLimit;
}
