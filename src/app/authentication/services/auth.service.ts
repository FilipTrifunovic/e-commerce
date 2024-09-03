import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { UserProfile, UserService } from "./user-profile.service";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import { ApiService } from "../../shared/services/api.service";

const authConfig: AuthConfig = {
  issuer: 'https://localhost:5001',
  redirectUri: 'http://localhost:4200/callback',
  clientId: 'angular_spa',
  responseType: 'code',
  scope: 'openid profile email product',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
  postLogoutRedirectUri: window.location.origin,

  useSilentRefresh: false, // Disable silent refresh
  sessionChecksEnabled: false,
  clearHashAfterLogin: true,
  oidc: true,
  customQueryParams: {
    prompt: 'login' // Forces login every time
  }
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  // public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
    private oauthService: OAuthService,
    private userService: UserService,
    private apiService: ApiService,
  ) {

  }

  public isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  signIn(): void {
    this.oauthService.initCodeFlow();
  }

  signOut(): void {
    const idToken = this.oauthService.getIdToken();
    this.isAuthenticatedSubject.next(false);
    this.oauthService.revokeTokenAndLogout({
      id_token_hint: idToken,
      post_logout_redirect_uri: window.location.origin,
    });
  }

  get token() {
    return this.oauthService.getAccessToken();
  }

  public configureOAuth(): void {
    this.oauthService.configure(authConfig);

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.isAuthenticatedSubject.next(true);
        this.getUserProfile();
      } else {
        this.router.navigate(['/login']);
      }
    }).catch(error => {
      this.router.navigate(['/login']);
    });
  }

  private getUserProfile() {
    this.oauthService.loadUserProfile().then((profile: any) => {

      const userProfile: UserProfile = this.userService.createUserProfile(profile);

      this.userService.saveUser(userProfile);
      this.router.navigate(['/home']);
    }).catch(error => {
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']);
    });
  }

  register(username: string, email: string, password: string, confirmPassword: string) {
    const body = { username, email, password, confirmPassword };
    return this.apiService.post('user/register', body, 'https://localhost:5001/api');
  }
}
