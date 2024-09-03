import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserProfile, UserService } from '../services/user-profile.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule,
    MatButtonModule],
  standalone: true
})
export class RegisterComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService) { }

  ngOnInit() {

  }

  register() {
    this.authService.register(this.username, this.email, this.password, this.confirmPassword).subscribe(
      () => {
        this.toast.success('You can now log in to your account.', 'Registration successful!');
        this.goToLogin();
      },
      error => {
        this.toast.error('Registration failed', error.error.text);
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
