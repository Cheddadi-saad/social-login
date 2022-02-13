import { SportingComponent } from './sporting/sporting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialComponent } from './components/social/social.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path:'login',
    component: SocialComponent
  }
  ,
  {
    path:'profile',
    component: ProfileComponent
  },
  {
    path:'**',
    redirectTo: 'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
