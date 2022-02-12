import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SportingComponent } from './sporting/sporting.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './componants/header/header.component';
import { HomeComponent } from './componants/home/home.component';
import { ProfileComponent } from './componants/profile/profile.component';
import { SocialComponent } from './componants/social/social.component';


@NgModule({
  declarations: [
    AppComponent,
    SportingComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    SocialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
