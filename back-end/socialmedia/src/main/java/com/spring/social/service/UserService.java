package com.spring.social.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring.social.dao.UserRepository;
import com.spring.social.dto.UserPrincipal;
import com.spring.social.model.User;

/**
 * The Class UserService.
 */
@Service
public class UserService implements UserDetailsService {

	/** The user repository. */
	private UserRepository userRepository;

	/**
	 * Instantiates a new user service.
	 *
	 * @param userRepository the user repository
	 */
	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	/**
	 * Load user by username.
	 *
	 * @param email the email
	 * @return the user details
	 * @throws UsernameNotFoundException the username not found exception
	 */
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email);

		return new UserPrincipal(user);
	}

}
