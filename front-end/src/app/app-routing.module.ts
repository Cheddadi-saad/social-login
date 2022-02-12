import { SportingComponent } from './sporting/sporting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialComponent } from './componants/social/social.component';
import { HomeComponent } from './componants/home/home.component';
import { ProfileComponent } from './componants/profile/profile.component';

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
