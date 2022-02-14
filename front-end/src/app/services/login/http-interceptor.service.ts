import { SocialService } from './../social.service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private socialService: SocialService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem('token');
    if (
      this.socialService.isUserLoggedIn() &&
      req.url.indexOf('social') === -1 &&
      token
    ) {

      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: token,
        }),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }

  }
}
