import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  // This method loads the user's data into the form
  loadUserData(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log({ user });
    if (user) {
      this.profileForm.patchValue({
        username: user.Username,
        password: '',
        email: user.Email,
        birthday: user.Birthday,
      });
    }
  }

  // This method updates the user's profile
  onSubmit(): void {
    if (this.profileForm.valid) {
      const userData = {
        Username: this.profileForm.value.username,
        Password: this.profileForm.value.password,
        Email: this.profileForm.value.email,
        Birthday: this.profileForm.value.birthday,
      };
      console.log('Submitting user data: ', userData);
      this.fetchApiData.editUserProfile(userData).subscribe(
        (response) => {
          if (response) {
            console.log('API response: ', response);
            localStorage.setItem('user', JSON.stringify(response));
            this.snackBar.open('Profile updated successfully!', 'OK', {
              duration: 2000,
            });
          } else {
            console.error('API response is empty or invalid');
            this.snackBar.open(
              'Failed to update profile. No data returned.',
              'OK',
              {
                duration: 2000,
              }
            );
          }
        },
        (error) => {
          console.error('API error: ', error);
          const errorMessage =
            error?.error?.errors?.[0]?.msg ||
            error.message ||
            'An unknown error occurred';
          this.snackBar.open(
            'Failed to update profile. ' + errorMessage,
            'OK',
            {
              duration: 2000,
            }
          );
        }
      );
    }
  }

  // This method will delete the user's account
  deleteAccount(): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (user.Username) {
        this.fetchApiData.deleteUser(user.Username).subscribe(
          (response) => {},
          (error) => {
            // console.error('Error deleting account:', error);
            // this.snackBar.open(
            //   'Something went wrong. Please try again.',
            //   'OK',
            //   {
            //     duration: 2000,
            //   }
            // );
          }
        );
        localStorage.clear();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.snackBar.open('Account deleted successfully!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['/welcome']);
      } else {
        this.snackBar.open('Username not found. Please log in again.', 'OK', {
          duration: 2000,
        });
      }
    }
  }
}
