import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private users = [
    { username: 'admin', password: 'admin' },
    { username: 'user1', password: 'password1' },
  ];


  constructor(private router: Router,) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  signIn(username: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.username === username && u.password === password);
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
