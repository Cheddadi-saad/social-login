package com.spring.social.service;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.spring.social.dto.JwtLogin;
import com.spring.social.dto.LoginResponse;
import com.spring.social.dto.UserPrincipal;
import com.spring.social.util.JwtProperties;

@Service
public class TokenService {
	private AuthenticationManager authenticationManager;

	@Autowired
	public TokenService(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	private String generateToken(Authentication authResult) {

		// Grab principal
		UserPrincipal principal = (UserPrincipal) authResult.getPrincipal();

		// Create JWT Token
		return JWT.create().withSubject(principal.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
				.sign(HMAC512(JwtProperties.SECRET.getBytes()));
	}

	public LoginResponse login(JwtLogin jwtLogin) throws Exception {
		Authentication authenticate = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(jwtLogin.getEmail(), jwtLogin.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authenticate);
		String token = generateToken(authenticate);
		List<String> listRoles = authenticate.getAuthorities().stream().map(role -> role.getAuthority())
				.collect(Collectors.toList());
		return new LoginResponse(token, listRoles);
	}
}