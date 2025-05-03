package com.backend.BackendApplication.repository;

import com.backend.BackendApplication.model.Beneficiary;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
    // if any customers is adding amount to user bank account (i.e Beneficiary)

    // Find beneficiaries by name (case-insensitive)
    List<Beneficiary> findByNameIgnoreCase(String name);

    // check if beneficiary exists for a user with a specific account number
    boolean existByUserIDAndAccountNumber(Long userID, String accountNumber);

    // delete a beneficiary by user and account number
    void deleteByUserIDAndAccountNumber(Long userID, String accountNumber);
}
