package com.spring.social.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
	
	

	private String token;
	private List<String> listRoles;

	
}
