package com.spring.social.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.social.dao.RoleRepository;
import com.spring.social.model.RoleBo;

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

	public List<RoleBo> getRoles() {
		return roleRepository.findAll();
	}
}
