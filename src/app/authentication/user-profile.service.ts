import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface UserProfile {
  email: string;
  phone: string | null;
  address: string | null;
  favoriteItems: string[] | null;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfile: UserProfile = {
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    favoriteItems: ['Item 1', 'Item 2'],
    username: 'admin',
  };

  constructor() { }

  getUserProfile(userId: string): Observable<UserProfile> {
    return of(this.userProfile);
  }

  updateUserProfile(userId: string, profileData: UserProfile): Observable<UserProfile> {
    this.userProfile = profileData;
    return of(this.userProfile);
  }

  saveUser(userProfile: UserProfile): UserProfile {
    // In a real application, you would save the user to a backend server here.
    // For this example, we will simply set the userProfile property.
    this.userProfile = userProfile;
    return this.userProfile;
  }
}
