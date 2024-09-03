import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { OAuthService } from 'angular-oauth2-oidc';

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string | null;
  address: string | null;
  favoriteItems: string[] | null;
  username: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfile: UserProfile;

  constructor(private apiService: ApiService,
    private oauthService: OAuthService
  ) { }

  getUserProfileData(): Observable<any> {
    return from(this.oauthService.loadUserProfile())
  }

  updateUserProfile(userId: string, profileData: UserProfile): Observable<any> {
    return this.apiService.put<UserProfile>(`user/${userId}`, profileData, 'https://localhost:5001/api');
  }

  saveUser(userProfile: UserProfile): UserProfile {
    // In a real application, you would save the user to a backend server here.
    // For this example, we will simply set the userProfile property.
    this.userProfile = userProfile;
    return this.userProfile;
  }

  createUserProfile(profile: any): UserProfile {
    return {
      firstName: profile.info.firstName,
      lastName: profile.info.lastName,
      email: profile.info.email,
      phone: profile.info.phone_number,
      address: profile.info.address,
      favoriteItems: [],
      username: profile.info.preferred_username,
      id: profile.info.sub
    };
  };
}
