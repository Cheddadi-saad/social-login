package com.spring.social.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.social.dao.UserRepository;
import com.spring.social.model.UserBo;

@Service
public class Runner  {
//	implements CommandLineRunner
//	@Autowired
//	private UserRepository userRepository;
//	@Autowired
//	private PasswordEncoder passwordEncoder;
//
//	@Override
//	public void run(String... args) throws Exception {
//		User user = new User();
//
//		user.setEmail("cheddadi.sc@gmail.com");
//		user.setPassword(passwordEncoder.encode("123456"));
//		userRepository.save(user);
//
//		User user1 = new User();
//
//		user1.setEmail("test@gmail.com");
//		user1.setPassword(passwordEncoder.encode("123456"));
//		userRepository.save(user1);
//
//	}

}
