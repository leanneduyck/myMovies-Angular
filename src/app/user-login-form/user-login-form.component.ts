// import { Component, OnInit, Input } from '@angular/core';

// // You'll use this import to close the dialog on success
// import { MatDialogRef } from '@angular/material/dialog';

// // This import brings in the API calls we created in 6.2
// import { FetchApiDataService } from '../fetch-api-data.service';

// // This import is used to display notifications back to the user
// import { MatSnackBar } from '@angular/material/snack-bar';

// // This import is used to route from the home page to the movies list
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-user-login-form',
//   templateUrl: './user-login-form.component.html',
//   styleUrls: ['./user-login-form.component.scss'],
// })
// export class UserLoginFormComponent implements OnInit {
//   @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

//   constructor(
//     public fetchApiData: FetchApiDataService,
//     public dialogRef: MatDialogRef<UserLoginFormComponent>,
//     public snackBar: MatSnackBar,
//     private router: Router
//   ) {}

//   ngOnInit(): void {}

//   // This is the function responsible for sending the form inputs to the backend
//   loginUser(): void {
//     this.fetchApiData.userLogin(this.userData).subscribe(
//       (response) => {
//         // Logic for a successful user login goes here!
//         this.dialogRef.close(); // This will close the modal on success!
//         this.snackBar.open('Login successful', 'OK', {
//           duration: 2000,
//         });
//         this.router.navigate(['movies']); // Navigate to movies list on successful login
//       },
//       (error) => {
//         this.snackBar.open('Login failed: ' + error, 'OK', {
//           duration: 2000,
//         });
//       }
//     );
//   }
// }

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
