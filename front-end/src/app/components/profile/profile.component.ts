import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: SocialAuthService,private social: SocialService) {}
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;
  studentsResponse: any = {};
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
    this.getPublicContent();

  }

  getPublicContent()  {
    this.social.getPublicContent().subscribe((result) => {
      this.studentsResponse = result;
      console.log(result);
    })
  }
}
