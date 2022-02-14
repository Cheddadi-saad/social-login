package com.spring.social.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring.social.dao.UserRepository;
import com.spring.social.dto.UserPrincipal;
import com.spring.social.model.UserBo;

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
		UserBo user = userRepository.findByEmail(email);

		return new UserPrincipal(user);
	}

	public boolean ifEmailExist(String email) {
		return userRepository.existsByEmail(email);
	}
	
	public UserBo findUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public UserBo saveUser(UserBo user) {
		return userRepository.save(user);
	}

}
