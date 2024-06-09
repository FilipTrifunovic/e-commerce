import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, CommonModule, MatCardModule, MatButtonModule],
  standalone: true
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Both fields are required';
      return;
    }
    this.authService.signIn(this.username, this.password).subscribe(success => {
      if (success) {
        this.errorMessage = '';
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

}
