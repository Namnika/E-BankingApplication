package com.backend.BackendApplication.repository;

import com.backend.BackendApplication.model.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {

}
