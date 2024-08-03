import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * this file contains all API calls for the client app
 */

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://my---movies-868565568c2a.herokuapp.com';

// Types for API requests and responses
type User = {
  Username: string;
  Birthday: string;
  Email: string;
  Password: string;
  FavoriteMovies: string[];
  _id: string;
};

type LoginRequest = {
  Username: string;
  Password: string;
};

type LoginResponse = {
  token: string;
  user: User;
};

type RegisterRequest = { Birthday: string; Email: string } & LoginRequest;

type Movie = {
  Genre: Genre;
  Director: Director;
  _id: string;
  Title: string;
  Release: string;
  Description: string;
  Rating: string;
  Image: string;
};

type Director = {
  Name: string;
  Birthyear: string;
  Description: string;
};

type Genre = {
  Name: string;
  Description: string;
};

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  apiUrl = 'https://my---movies-868565568c2a.herokuapp.com';

  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  /**
   * creates fetchApiDataService
   * @param http
   */
  constructor(private http: HttpClient) {}

  // registers new user
  // endpoint: /users/create
  /**
   * registers new user
   * @param userDetails
   * @returns Observable with registration response
   */
  public userRegistration(userDetails: RegisterRequest) {
    return this.http
      .post(`${this.apiUrl}/users/create`, userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
      })
      .pipe(
        map((response) => {
          console.log('Registration successful, response:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // user login, authenticates user
  // endpoint: /login
  /**
   * authenticates user and logs in user
   * @param userDetails
   * @returns Observable w/login response including token and user data
   */
  public userLogin(userDetails: LoginRequest) {
    return this.http
      .post(`${this.apiUrl}/login`, userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        map((response) => {
          console.log('Login successful, response:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // main view, returns list of all movies to logged-in users
  // endpoint: /movies
  /**
   * gets list of all movies
   * @returns Observable with list of movies
   */
  public getAllMovies() {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${this.apiUrl}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get user profile
  // endpoint: /users/:username
  /**
   * gets user profile
   * @returns Observable with user profile data
   */
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${this.apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // add to favorites
  // endpoint: /users/:username/movies/:movieId
  /**
   * adds movie to user's favorites
   * @param movieId
   * @returns Observable with response from API
   */
  public addToFavorites(movieId: string) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .post(`${this.apiUrl}/users/${user.Username}/movies/${movieId}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // remove from favorites
  // endpoint: /users/:username/movies/:movieId
  /**
   * removes movie from user's favorites
   * @param movieId
   * @returns Observable with response from API
   */
  public removeFromFavorites(movieId: string) {
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
  /**
   * edits user profile
   * @param userData
   * @returns Observable with response from API
   */
  public editUserProfile(userData: User) {
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
  /**
   * deletes user account
   * @param Username
   * @returns Observable with response from API
   */
  public deleteUser(Username: string) {
    const token = localStorage.getItem('token');
    console.log({ Username, token });
    return this.http.delete(`${this.apiUrl}/users/${Username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
  }

  /**
   * extracts response data
   * @param res - HTTP response
   * @returns
   */
  private extractResponseData(res: any): any {
    return res || {};
  }

  // Error handling
  /**
   * handles errors
   * @param error - HTTP error response
   * @returns Observable with error message
   */
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
