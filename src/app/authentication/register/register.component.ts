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
import { UserProfile, UserService } from '../user-profile.service';
import { ToastrService } from 'ngx-toastr';

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
  password: string;
  confirmPassword: string;
  email: string;
  errorMessage: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {

  }

  register() {
    debugger;
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const newUser: UserProfile = {
      firstName: null,
      lastName: null,
      favoriteItems: [],
      phone: null,
      address: null,
      email: this.email,
      username: this.username,
      password: this.password
    };

    if (this.username && this.password && this.email) {
      this.userService.saveUser(newUser);
      this.toastr.success('Registered successfully', 'Success', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
