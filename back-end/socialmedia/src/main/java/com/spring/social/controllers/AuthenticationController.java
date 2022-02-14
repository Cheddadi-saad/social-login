package com.spring.social.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.social.dto.JwtLogin;
import com.spring.social.dto.LoginResponse;
import com.spring.social.service.TokenService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

	@Autowired
	private TokenService tokenService;
	
	@PostMapping("/login")
	public LoginResponse login(@RequestBody JwtLogin jwtLogin) throws Exception {
		return tokenService.login(jwtLogin);
	}
}
