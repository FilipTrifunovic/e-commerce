import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: '<p>Logging in...</p>',
})
export class CallbackComponent {
  constructor(
    private authService: AuthService) {
    console.log('CallbackComponent');
    //this.authService.tryLogin();
  }
}
