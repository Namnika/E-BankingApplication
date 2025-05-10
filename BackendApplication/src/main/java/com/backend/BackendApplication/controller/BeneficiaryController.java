package com.backend.BackendApplication.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.BackendApplication.dto.BeneficiaryRequestDto;
import com.backend.BackendApplication.dto.BeneficiaryResponseDto;
import com.backend.BackendApplication.model.Beneficiary;
import com.backend.BackendApplication.service.BeneficiaryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/beneficiaries")
public class BeneficiaryController {

	@Autowired
	private BeneficiaryService beneficiaryService;

	@GetMapping
	public List<Beneficiary> getAllBeneficiaries() {
		return beneficiaryService.getAllBeneficiaries();
	}

	@GetMapping("/{id}")
	public Beneficiary getBeneficiaryById(@PathVariable Long id) {
		return beneficiaryService.getBeneficiaryById(id);
	}

	// CREATE: Add a new beneficiary
	@PostMapping
	public ResponseEntity<BeneficiaryResponseDto> createBeneficiary(
			@Valid @RequestBody BeneficiaryRequestDto requestDto) {
		return ResponseEntity.ok(beneficiaryService.addBeneficiary(requestDto));
	}

	// Update: update beneficiary
	@PutMapping("/{userId}")
	public ResponseEntity<BeneficiaryResponseDto> updateBeneficiary(
			@PathVariable Long userId,
			@PathVariable String accountNumber,
			@Valid @RequestBody BeneficiaryRequestDto updateDto) {
		return ResponseEntity.ok(beneficiaryService.updateBeneficiary(userId, accountNumber, updateDto));
	}

	// DELETE: delete a beneficiary
	@DeleteMapping("/{userId}")
	public ResponseEntity<Map<String, String>> deleteBeneficiary(
			@PathVariable Long userId,
			@PathVariable String accountNumber) {
		try {
			beneficiaryService.deleteBeneficiary(userId, accountNumber);
			Map<String, String> response = new HashMap<>();
			response.put("message", "Beneficiary deleted successfully!");
			return ResponseEntity.ok(response);
		} catch (RuntimeException e) {
			Map<String, String> error = new HashMap<>();
			error.put("error", e.getMessage());
			return ResponseEntity.badRequest().body(error);
		}
	}
}
