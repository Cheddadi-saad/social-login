import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
/**
 * Component
 */
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
})

export class SocialComponent implements OnInit {
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;
  constructor(private authService: SocialAuthService) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  /**
   * Signs in with google
   */
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      this.user = data;
      console.log(data);
    });
  }

 /**
  * Signs in with fb
  */
 signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      this.user = data;
      console.log(data);
    });
  }

  /**
   * Signs out
   */
  signOut(): void {
    this.authService.signOut();
  }
}
