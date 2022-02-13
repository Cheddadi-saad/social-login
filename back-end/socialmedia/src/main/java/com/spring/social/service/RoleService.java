package com.spring.social.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.social.dao.RoleRepository;

/**
 * The Class RoleService.
 */
@Service
public class RoleService {

	/** The role repository. */
	private RoleRepository roleRepository;

	/**
	 * Instantiates a new role service.
	 *
	 * @param roleRepository the role repository
	 */
	@Autowired
	public RoleService(RoleRepository roleRepository) {
		this.roleRepository = roleRepository;
	}

}
