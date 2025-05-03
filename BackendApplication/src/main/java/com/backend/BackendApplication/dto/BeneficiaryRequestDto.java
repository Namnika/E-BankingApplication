package com.backend.BackendApplication.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BeneficiaryRequestDto {
    private Long userId;
    private String name;
    private String accountNumber;
    private String bankName;
    private Double maxTransferLimit;

}
