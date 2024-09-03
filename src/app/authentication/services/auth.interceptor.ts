import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private oauthService: OAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the access token from the OAuthService
    const token = this.oauthService.getAccessToken();
    if (token) {
      const headers = req.headers
        .set('Authorization', 'Bearer ' + token);

      const clonedRequest = req.clone({ headers });
      return next.handle(clonedRequest);
    } else {
      // If there is no token, simply pass the request along without modifying it
      return next.handle(req);
    }
  }
}
