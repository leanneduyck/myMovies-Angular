import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserLoginFormComponent>,
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {}

  // This method will be called when the form is submitted
  onSubmit(): void {
    if (this.loginForm.valid) {
      const userData = {
        Username: this.loginForm.value.username,
        Password: this.loginForm.value.password,
      };

      console.log('Logging in:', userData);

      this.fetchApiData.userLogin(userData).subscribe(
        (response) => {
          console.log('Response:', response);
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            this.snackBar.open('Login successful!', 'OK', {
              duration: 2000,
            });
            this.router.navigate(['/movies']); // Navigate to movies after login
            this.dialogRef.close(); // Close the dialog on success
          }
        },
        (error) => {
          this.snackBar.open('Sorry, something went wrong.', 'OK', {
            duration: 2000,
          });
        }
      );
    }
  }
}
