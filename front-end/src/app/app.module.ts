import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SportingComponent } from './sporting/sporting.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SocialComponent } from './components/social/social.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

@NgModule({
  declarations: [AppComponent, SportingComponent, HeaderComponent, HomeComponent, ProfileComponent, SocialComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, SocialLoginModule],
  providers: [
    // Creates a new social auth service.
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          // Google login provider.
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '680577579172-ee0hpmv4oshral4akgtvs5k600gj07pa.apps.googleusercontent.com'
            ),
          },
          // Facebook login provider.
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('347845843869218'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
