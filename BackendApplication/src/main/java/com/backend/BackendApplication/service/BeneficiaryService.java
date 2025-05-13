package com.backend.BackendApplication.service;

import org.springframework.security.access.AccessDeniedException;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.backend.BackendApplication.dto.BeneficiaryRequestDto;
import com.backend.BackendApplication.dto.BeneficiaryResponseDto;
import com.backend.BackendApplication.model.Beneficiary;
import com.backend.BackendApplication.model.User;
import com.backend.BackendApplication.repository.BeneficiaryRepository;
import com.backend.BackendApplication.repository.UserRepository;
import com.backend.BackendApplication.security.CustomUserDetails;

@Service
public class BeneficiaryService {

	@Autowired
	private BeneficiaryRepository beneficiaryRepository;

	@Autowired
	private UserRepository userRepository;

	public List<Beneficiary> getAllBeneficiaries() {
		return beneficiaryRepository.findAll();
	}

	public Beneficiary getBeneficiaryById(Long id) {
		return beneficiaryRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Beneficiary not found"));
	}

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
	public void deleteBeneficiary(Long id) {
		// Get the currently logged-in user
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		Long currentUserId = userDetails.getUser().getId();

		// Find the beneficiary to be deleted
		Beneficiary beneficiary = beneficiaryRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Beneficiary not found"));

		// Check if the beneficiary belongs to the current user
		if (!beneficiary.getBeneficiaryUser().getId().equals(currentUserId)) {
			throw new AccessDeniedException("You don't have permission to delete this beneficiary");
		}

		// If we get here, the logged-in user owns the beneficiary, so we can delete it
		beneficiaryRepository.delete(beneficiary);

		// We can only delete beneficiaries that belong to your own user account,
		// regardless of the beneficiary ID. This is a security measure to prevent users
		// from deleting other users' beneficiaries.
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
