package com.backend.BackendApplication.repository;

import com.backend.BackendApplication.model.Beneficiary;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {

    /**
     * define: The customer is saving the beneficiary’s details so they can transfer
     * money to them later.
     * (Real world ex):
     * Alice and Bob are friends.
     * Alice wants to transfer money to Bob’s bank account using her online banking
     * app.
     *
     */

    // Find beneficiaries by name (case-insensitive)
    List<Beneficiary> findByNameIgnoreCase(String name);

    // check if beneficiary exists for a user with a specific account number
    boolean existsByUserIdAndAccountNumber(Long userId, String accountNumber);

    // delete a beneficiary by user and account number
    void deleteByUserIdAndAccountNumber(Long userId, String accountNumber);
}
