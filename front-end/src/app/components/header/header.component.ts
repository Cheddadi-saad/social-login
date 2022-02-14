import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  user: SocialUser = new SocialUser();
  constructor(private socialService: SocialService, private authService: SocialAuthService) {}
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;

      let token = sessionStorage.getItem('token');
      const rolesSession = window.sessionStorage.getItem('auth-user');

      console.log(token);
      console.log(rolesSession);

      if (token && token.length > 0 && rolesSession) {
        this.roles = JSON.parse(rolesSession);
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      }
    });
  }
  logout(): void {
    this.socialService.signOut();
    window.location.reload();
  }
}
