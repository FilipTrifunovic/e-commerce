import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { UserProfile, UserService } from "./user-profile.service";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";

const authConfig: AuthConfig = {
  issuer: 'https://localhost:5001',
  redirectUri: window.location.origin + '/callback',
  clientId: 'angular_spa',
  responseType: 'code',
  scope: 'openid profile api1 email',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
  postLogoutRedirectUri: window.location.origin,
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
  ) {
    this.configureOAuth();
  }

  private getUserProfile() {
    this.oauthService.loadUserProfile().then((profile: any) => {
      const userProfile: UserProfile = {
        favoriteItems: [],
        phone: null,
        address: null,
        email: profile.info.email,
        username: profile.info.name
      };
      this.userService.saveUser(userProfile);
      this.isAuthenticatedSubject.next(true);
      this.router.navigate(['/home']);
      console.log(profile); // Contains user info such as name, email, etc.
    }).catch(error => {
      console.error('Error loading user profile', error);
      this.router.navigate(['/login']);
    });
  }


  public tryLogin(): void {
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(isAuthenticated => {
      console.log('isAuthenticated', isAuthenticated);
      if (isAuthenticated) {
        this.getUserProfile();
      } else {
        this.router.navigate(['/login']);
      }
    }).catch(error => {
      console.error('Error during login process', error);
      this.router.navigate(['/login']);
    });
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  signIn(): void {
    this.oauthService.initImplicitFlow();
  }

  signOut(): void {
    this.oauthService.logOut();
    this.oauthService.revokeTokenAndLogout();
    this.isAuthenticatedSubject.next(false);
    // localStorage.removeItem('token');
    // this.isLoggedInSubject.next(false);
    // this.router.navigate(['/login']);
  }

  get token() {
    return this.oauthService.getAccessToken();
  }

  private configureOAuth(): void {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(isAuthenticated => {
      if (isAuthenticated) {
        this.getUserProfile();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
