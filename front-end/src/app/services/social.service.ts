import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root',
})
export class SocialService {
  private baseUrl = 'http://localhost:8080/social/';

  constructor(private http: HttpClient, private authService: SocialAuthService) {}
  loginResponse: any = {};
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;
  /**
   * Logins with google
   * @param token
   * @returns with google
   */
  loginWithGoogle(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}google`, { token }).pipe(
      map((response) => {
        this.loginResponse = response;
        sessionStorage.setItem('token', 'Bearer ' + this.loginResponse.token);
        this.saveUser(this.loginResponse.listRoles);
        return response;
      })
    );
  }

  /**
   * Logins with facebook
   * @param token
   * @returns with facebook
   */
  loginWithFacebook(token: any): Observable<any> {
    return this.http.post(`${this.baseUrl}facebook`, { token }).pipe(
      map((response) => {
        this.loginResponse = response;
        sessionStorage.setItem('token', 'Bearer ' + this.loginResponse.token);
        this.saveUser(this.loginResponse.listRoles);
        return response;
      })
    );
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  isUserLoggedIn() {
    let token = sessionStorage.getItem('token');
    if (token === null) return false;
    return true;
  }
  /**
   * Signs out
   */
  signOut(): void {
    window.sessionStorage.clear();
    this.authService.signOut();
  }

  getPublicContent(): Observable<any> {
    return this.http.get('http://localhost:8080/api/students').pipe(
      map(response => {
        return response;
      })
    );
  }


}
