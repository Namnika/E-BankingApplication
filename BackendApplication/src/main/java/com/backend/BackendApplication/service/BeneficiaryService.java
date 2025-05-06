package com.backend.BackendApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.BackendApplication.dto.BeneficiaryRequestDto;
import com.backend.BackendApplication.dto.BeneficiaryResponseDto;
import com.backend.BackendApplication.model.Beneficiary;
import com.backend.BackendApplication.model.User;
import com.backend.BackendApplication.repository.BeneficiaryRepository;
import com.backend.BackendApplication.repository.UserRepository;

@Service
public class BeneficiaryService {

	@Autowired
	private BeneficiaryRepository beneficiaryRepository;

	@Autowired
	private UserRepository userRepository;

	// CREATE: Add a new beneficiary
	public BeneficiaryResponseDto addBeneficiary(BeneficiaryRequestDto dto) {
		User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User Not Found!"));

		// otherwise add a new beneficiary
		Beneficiary beneficiary = new Beneficiary();
		beneficiary.setBeneficiaryUser(user);
		beneficiary.setBeneficiaryName(dto.getName());
		beneficiary.setBeneficiaryAccountNumber(dto.getAccountNumber());
		beneficiary.setbeneficiaryBankName(dto.getBankName());
		beneficiary.setMaxTransferLimit(dto.getMaxTransferLimit());

		Beneficiary savedBeneficiary = beneficiaryRepository.save(beneficiary);

		return mapToResponseDto(savedBeneficiary);

	}

	// UPDATE: update beneficiary
	public BeneficiaryResponseDto updateBeneficiary(Long userId, String accountNumber, BeneficiaryRequestDto dto) {
		Beneficiary beneficiary = beneficiaryRepository.findByUserIdAndAccountNumber(userId, accountNumber)
				.orElseThrow(() -> new RuntimeException("Beneficiary Not Found!"));

		// Otherwise update beneficiary
		beneficiary.setBeneficiaryName(dto.getName());
		beneficiary.setbeneficiaryBankName(dto.getBankName());
		beneficiary.setMaxTransferLimit(dto.getMaxTransferLimit());

		Beneficiary savedBeneficiary = beneficiaryRepository.save(beneficiary);

		return mapToResponseDto(savedBeneficiary);

	}

	// DELETE: delete a beneficiary
	public void deleteBeneficiary(Long userId, String accountNumber) {
		beneficiaryRepository.deleteByUserIdAndAccountNumber(userId, accountNumber);
	}

	// Helper method: Map user to UserResponseDto (display user's data in
	// beneficiary page)

	private BeneficiaryResponseDto mapToResponseDto(Beneficiary beneficiary) {
		BeneficiaryResponseDto dto = new BeneficiaryResponseDto();

		dto.setId(beneficiary.getBeneficiaryId());
		dto.setName(beneficiary.getBeneficiaryName());
		dto.setBankName(beneficiary.getBankName());
		dto.setAccountNumber(beneficiary.getBeneficiaryAccountNumber());
		dto.setMaxTransferLimit(beneficiary.getMaxTransferLimit());

		return dto;
	}

}
