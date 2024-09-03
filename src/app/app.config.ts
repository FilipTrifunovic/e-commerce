import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { AuthInterceptor } from './authentication/services/auth.interceptor';
import { AuthService } from './authentication/services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr(),
    //provideHttpClient(),
    provideOAuthClient(),
    importProvidersFrom(
      HttpClientModule  // Correct usage for HttpClientModule as a standalone import
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService
  ]
};
