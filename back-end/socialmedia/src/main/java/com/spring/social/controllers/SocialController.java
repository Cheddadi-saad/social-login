/**
 * 
 */
package com.spring.social.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.spring.social.dto.JwtLogin;
import com.spring.social.dto.LoginResponse;
import com.spring.social.dto.TokenDto;
import com.spring.social.model.RoleBo;
import com.spring.social.model.UserBo;
import com.spring.social.service.RoleService;
import com.spring.social.service.TokenService;
import com.spring.social.service.UserService;

/**
 * The Class GoogleController.
 *
 * @author chedd
 */
@RestController
@RequestMapping("/social")
public class SocialController {

	/** The id client. */
	@Value("${google.id}")
	private String idClient;

	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleService roleService;

	@Value("${secret.password}")
	private String secretPassword;

	@Autowired
	private TokenService tokenService;

	/**
	 * Login with google.
	 *
	 * @param tokenDto the token dto
	 * @return the response entity
	 * @throws Exception
	 */
	@PostMapping("/google")
	public ResponseEntity<LoginResponse> loginWithGoogle(@RequestBody TokenDto tokenDto) throws Exception {

		NetHttpTransport transport = new NetHttpTransport();
		GsonFactory factory = GsonFactory.getDefaultInstance();

		GoogleIdTokenVerifier.Builder verifier = new GoogleIdTokenVerifier.Builder(transport, factory)
				.setAudience(Collections.singleton(idClient));

		GoogleIdToken googleIdToken = GoogleIdToken.parse(verifier.getJsonFactory(), tokenDto.getToken());

		GoogleIdToken.Payload payload = googleIdToken.getPayload();
		String email = payload.getEmail();
		UserBo user;
		if (userService.ifEmailExist(email)) {
			user = userService.findUserByEmail(email);
			System.out.println("==========> Email exist");
		} else {
			user = createUser(email);
			System.out.println("==========> Email not exist");
		}

		JwtLogin jwtLogin = new JwtLogin();
		jwtLogin.setEmail(user.getEmail());
		jwtLogin.setPassword(secretPassword);

		return new ResponseEntity<>(tokenService.login(jwtLogin), HttpStatus.OK);

	}

	private UserBo createUser(String email) {
		UserBo user = new UserBo();

		user.setEmail(email);
		user.setPassword(passwordEncoder.encode(secretPassword));
		List<RoleBo> roles = roleService.getRoles();
		user.getRoles().add(roles.get(0));

		return userService.saveUser(user);
	}

	/**
	 * Login with facebook.
	 *
	 * @param tokenDto the token dto
	 * @return the response entity
	 */
	@PostMapping("/facebook")
	public ResponseEntity<?> loginWithFacebook(@RequestBody TokenDto tokenDto) {

		Facebook facebook = new FacebookTemplate(tokenDto.getToken());
		String[] data = { "email", "name", "picture" };
		User user = facebook.fetchObject("me", User.class, data);

		return new ResponseEntity<>(user, HttpStatus.OK);
	}

}
