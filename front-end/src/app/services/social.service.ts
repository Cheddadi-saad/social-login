import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  private baseUrl = 'http://localhost:8080/social/';

  constructor(private http: HttpClient) {}

  /**
   * Logins with google
   * @param token
   * @returns with google
   */
  loginWithGoogle(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}google`, {token}).pipe(
      map((response) => {
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
    return this.http.post(`${this.baseUrl}facebook`, {token}).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
