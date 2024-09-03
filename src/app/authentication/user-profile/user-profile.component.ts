import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserProfile, UserService } from '../services/user-profile.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]

})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  profile: UserProfile;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      address: [''],
      //favoriteItems: [''],
      username: [''],
      //password: ['']
    });
  }

  ngOnInit() {
    this.userService.getUserProfileData().subscribe((profile: UserProfile) => {
      this.profile = this.userService.createUserProfile(profile);
      this.profileForm.patchValue(this.profile);
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onSubmit() {
    debugger;
    if (this.profileForm.valid) {
      this.userService.updateUserProfile(this.profile.id, this.profileForm.value).subscribe((profile: UserProfile) => {
        this.profileForm.patchValue(profile);
        this.toastr.success('Profile uploaded', 'Success', {
          positionClass: 'toast-bottom-right'
        });
      });
    }
  }
}
