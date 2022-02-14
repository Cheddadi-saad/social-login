package com.spring.social.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.social.model.UserBo;

/**
 * The Interface UserRepository.
 */
@Repository
public interface UserRepository extends JpaRepository<UserBo, Long>{

	/**
	 * Find by email.
	 *
	 * @param email the email
	 * @return the user
	 */
	public UserBo findByEmail(String email);
	
	public boolean existsByEmail(String email);
	
	
}
