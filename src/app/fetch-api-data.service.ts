import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://my---movies-868565568c2a.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  apiUrl = 'https://my---movies-868565568c2a.herokuapp.com';
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // registers new user
  // endpoint: /users/create
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return (
      this.http
        // uses POST method to make an API call
        .post(`${this.apiUrl}/users/create`, userDetails, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // adds user to local storage
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }),
        })
        .pipe(
          map((response) => {
            console.log('Registration successful, response:', response);
            return response;
          }),
          catchError(this.handleError)
        )
    );
  }

  // user login, authenticates user
  // endpoint: /login
  public userLogin(userDetails: {
    Username: string;
    Password: string;
  }): Observable<any> {
    return (
      this.http
        // uses POST method to make an API call
        .post<any>(`${this.apiUrl}/login`, userDetails, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        })
        .pipe(catchError(this.handleError))
    );
  }

  // main view, returns list of all movies to logged-in users
  // endpoint: /movies
  public getAllMovies(): Observable<any> {
    // retrieves authentication token from local storage
    const token = localStorage.getItem('token');
    return (
      this.http
        // uses GET method to make an API call, includes token in header
        .get(`${this.apiUrl}/movies`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    );
  }

  // add to favorites
  // endpoint: /users/:username/movies/:movieId
  addToFavorites(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    console.log('User:', user);
    console.log('Token:', token);

    return this.http
      .post(`${this.apiUrl}/users/${user.Username}/movies/${movieId}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError('Error adding movie to Favorites!');
        })
      );
  }

  // remove from favorites
  // endpoint: /users/:username/movies/:movieId
  removeFromFavorites(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${user.Username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // logic for editing user profile
  // endpoint: /users/:username, allows users to edit profileView
  editUserProfile(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(`${this.apiUrl}/users/${userData.Username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // logic for deleting user account
  // endpoint: /users/:username, allows users to delete account
  deleteUser(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log({ Username, token });
    return this.http.delete(`${this.apiUrl}/users/${Username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    return res || {};
  }

  // Error handling
  private handleError(error: HttpErrorResponse): any {
    console.error('Error:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
