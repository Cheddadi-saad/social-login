/**
 * 
 */
package com.spring.social.Controllers;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.spring.social.dto.TokenDto;

/**
 * The Class GoogleController.
 *
 * @author chedd
 */
@RestController
@RequestMapping("/api")
public class GoogleController {

	/** The id client. */
	@Value("${google.id}")
	private String idClient;

	/**
	 * Login with google.
	 *
	 * @param tokenDto the token dto
	 * @return the response entity
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	@PostMapping("/google")
	public ResponseEntity<?> loginWithGoogle(@RequestBody TokenDto tokenDto) throws IOException {

		NetHttpTransport transport = new NetHttpTransport();
		GsonFactory factory = GsonFactory.getDefaultInstance();

		GoogleIdTokenVerifier.Builder verifier = new GoogleIdTokenVerifier.Builder(transport, factory)
				.setAudience(Collections.singleton(idClient));

		GoogleIdToken googleIdToken = GoogleIdToken.parse(verifier.getJsonFactory(), tokenDto.getToken());

		GoogleIdToken.Payload payload = googleIdToken.getPayload();

		return new ResponseEntity<>(payload, HttpStatus.OK);

	}

	@PostMapping("/facebook")
	public ResponseEntity<?> loginWithFacebook(@RequestBody TokenDto tokenDto) {

		Facebook facebook = new FacebookTemplate(tokenDto.getToken());
		String[] data = { "email", "name", "picture" };
		User user = facebook.fetchObject("me", User.class, data);
		

		return new ResponseEntity<>(user, HttpStatus.OK);
	}

}
