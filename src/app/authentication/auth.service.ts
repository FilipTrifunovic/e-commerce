import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { UserService } from "./user-profile.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private router: Router,
    private userService: UserService,
  ) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  signIn(username: string, password: string): Observable<boolean> {
    const user = this.userService.getUserByUsernameAndPassword(username, password);
    if (user) {
      localStorage.setItem('token', 'some-random-token');
      this.isLoggedInSubject.next(true);
      return of(true);
    }
    return of(false);
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}
