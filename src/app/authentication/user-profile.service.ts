import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  favoriteItems: string[];
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfile: UserProfile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    favoriteItems: ['Item 1', 'Item 2'],
    username: 'admin',
    password: 'admin'
  };

  constructor() { }

  getUserProfile(userId: string): Observable<UserProfile> {
    return of(this.userProfile);
  }

  getUserByUsernameAndPassword(username: string, password: string): UserProfile {
    if (username === this.userProfile.username && password === this.userProfile.password) {
      return this.userProfile;
    }
    return null;
  }

  updateUserProfile(userId: string, profileData: UserProfile): Observable<UserProfile> {
    this.userProfile = profileData;
    return of(this.userProfile);
  }
}
