package com.backend.BackendApplication.model;

import jakarta.persistence.*;

@Entity
@Table(name = "beneficiaries")
public class Beneficiary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String name;

    @Column(name = "account_number", nullable = false)
    private String beneficiaryAccountNumber;

    @Column(name = "bank_name", nullable = false)
    private String beneficiaryBankName;

    @Column(name = "max_transfer_limit", nullable = false)
    private Double maxTransferLimit;

    // getters and setters to modify the fields

    public Long getBeneficiaryId() {
        return id;
    }

    public void setBeneficiaryId(Long id) {
        this.id = id;
    }

    public User getBeneficiaryUser() {
        return user;
    }

    public void setBeneficiaryUser(User user) {
        this.user = user;
    }

    public String getBeneficiaryName() {
        return name;
    }

    public void setBeneficiaryName(String name) {
        this.name = name;
    }

    public String getBeneficiaryAccountNumber() {
        return beneficiaryAccountNumber;
    }

    public void setBeneficiaryAccountNumber(String beneficiaryAccountNumber) {
        this.beneficiaryAccountNumber = beneficiaryAccountNumber;
    }

    public String getBankName() {
        return beneficiaryBankName;
    }

    public void setbeneficiaryBankName(String beneficiaryBankName) {
        this.beneficiaryBankName = beneficiaryBankName;
    }

    public Double getMaxTransferLimit() {
        return maxTransferLimit;
    }

    public void setMaxTransferLimit(Double maxTransferLimit) {
        this.maxTransferLimit = maxTransferLimit;
    }

}
