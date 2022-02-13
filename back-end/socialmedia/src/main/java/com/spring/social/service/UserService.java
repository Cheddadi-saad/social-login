package com.spring.social.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.spring.social.dao.UserRepository;
import com.spring.social.dto.UserPrincipal;
import com.spring.social.model.User;

@Service
public class UserService {

	private UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public UserDetails loadByEmail(String email) {

		User user = userRepository.findByEmail(email);

		return new UserPrincipal(user);
	}

}
