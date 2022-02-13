package com.spring.social.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.social.model.User;

/**
 * The Interface UserRepository.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	/**
	 * Find by email.
	 *
	 * @param email the email
	 * @return the user
	 */
	public User findByEmail(String email);
}
