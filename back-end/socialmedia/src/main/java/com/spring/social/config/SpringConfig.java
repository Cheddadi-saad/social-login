package com.spring.social.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.spring.social.service.UserService;

/**
 * The Class SpringConfig.
 */
@Configuration
public class SpringConfig extends WebSecurityConfigurerAdapter {

	/** The user service. */
	private UserService userService;

	/**
	 * Instantiates a new spring config.
	 *
	 * @param userService the user service
	 */
	@Autowired
	public SpringConfig(UserService userService) {
		this.userService = userService;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider());
	}

	/**
	 * Configure.
	 *
	 * @param http the http
	 * @throws Exception the exception
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().anyRequest().permitAll().and().httpBasic();
	}

	/**
	 * Authentication provider.
	 *
	 * @return the dao authentication provider
	 */
	@Bean
	DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();

		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());

		daoAuthenticationProvider.setUserDetailsService(userService);

		return daoAuthenticationProvider;
	}

	/**
	 * Password encoder.
	 *
	 * @return the password encoder
	 */
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
