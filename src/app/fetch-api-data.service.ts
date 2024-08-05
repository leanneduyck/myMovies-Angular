// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import {
//   HttpClient,
//   HttpHeaders,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { isPlatformBrowser } from '@angular/common';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// // Declaring the API URL that will provide data for the client app
// const apiUrl = 'https://my---movies-868565568c2a.herokuapp.com';

// @Injectable({
//   providedIn: 'root',
// })
// export class FetchApiDataService {
//   apiUrl = 'https://my---movies-868565568c2a.herokuapp.com';

//   constructor(
//     private http: HttpClient,
//     @Inject(PLATFORM_ID) private platformId: any
//   ) {}

//   // added this section to circumvent localStorage error
//   private isBrowser(): boolean {
//     return isPlatformBrowser(this.platformId);
//   }

//   private getToken(): string | null {
//     return this.isBrowser() ? localStorage.getItem('token') : null;
//   }

//   private getUser(): any {
//     return this.isBrowser()
//       ? JSON.parse(localStorage.getItem('user') || '{}')
//       : {};
//   }

//   public userRegistration(userDetails: any): Observable<any> {
//     return this.http
//       .post(`${this.apiUrl}/users/create`, userDetails, {
//         headers: new HttpHeaders({
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + this.getToken(),
//         }),
//       })
//       .pipe(
//         map((response) => {
//           console.log('Registration successful, response:', response);
//           return response;
//         }),
//         catchError(this.handleError)
//       );
//   }

//   public userLogin(userDetails: {
//     Username: string;
//     Password: string;
//   }): Observable<any> {
//     return this.http
//       .post<any>(`${this.apiUrl}/login`, userDetails, {
//         headers: new HttpHeaders({
//           'Content-Type': 'application/json',
//         }),
//       })
//       .pipe(catchError(this.handleError));
//   }

//   public getAllMovies(): Observable<any> {
//     return this.http
//       .get(`${this.apiUrl}/movies`, {
//         headers: new HttpHeaders({
//           Authorization: 'Bearer ' + this.getToken(),
//         }),
//       })
//       .pipe(map(this.extractResponseData), catchError(this.handleError));
//   }

//   addToFavorites(movieId: string): Observable<any> {
//     const user = this.getUser();
//     return this.http
//       .post(`${this.apiUrl}/users/${user.Username}/movies/${movieId}`, null, {
//         headers: new HttpHeaders({
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + this.getToken(),
//         }),
//       })
//       .pipe(
//         catchError((error) => {
//           console.error('Error:', error);
//           return throwError('Error adding movie to Favorites!');
//         })
//       );
//   }

//   removeFromFavorites(movieId: string): Observable<any> {
//     const user = this.getUser();
//     return this.http
//       .delete(`${apiUrl}/users/${user.Username}/movies/${movieId}`, {
//         headers: new HttpHeaders({
//           Authorization: 'Bearer ' + this.getToken(),
//         }),
//       })
//       .pipe(catchError(this.handleError));
//   }

//   editUserProfile(userData: any): Observable<any> {
//     return this.http
//       .put(`${this.apiUrl}/users/${userData.Username}`, userData, {
//         headers: new HttpHeaders({
//           Authorization: 'Bearer ' + this.getToken(),
//         }),
//       })
//       .pipe(catchError(this.handleError));
//   }

//   deleteUser(Username: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/users/${Username}`, {
//       headers: new HttpHeaders({
//         Authorization: 'Bearer ' + this.getToken(),
//       }),
//     });
//   }

//   private extractResponseData(res: any): any {
//     return res || {};
//   }

//   private handleError(error: HttpErrorResponse): any {
//     console.error('Error:', error);
//     if (error.error instanceof ErrorEvent) {
//       console.error('An error occurred:', error.error.message);
//     } else {
//       console.error(
//         `Backend returned code ${error.status}, ` +
//           `body was: ${JSON.stringify(error.error)}`
//       );
//     }
//     return throwError('Something bad happened; please try again later.');
//   }
// }

//
// code below is not using <any>, but not working since API/documentation disaster
//
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
export type User = {
  Username: string;
  Birthday: string;
  Email: string;
  Password: string;
  FavoriteMovies: string[];
  _id: string;
};

export type LoginRequest = {
  Username: string;
  Password: string;
};

type LoginResponse = {
  token: string;
  user: User;
};

export type RegisterRequest = { Birthday: string; Email: string } & LoginRequest;

export type Movie = {
  Genre: Genre;
  Director: Director;
  _id: string;
  Title: string;
  Release: string;
  Description: string;
  Rating: string;
  Image: string;
};

export type MovieWithFavorite = { isFavorited: boolean } & Movie

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

  /**
   * Creates an instance of the MyClass.
   * @description Inject the HttpClient module to the constructor params.
   * This will provide HttpClient to the entire class, making it available via this.http
   * @constructor
   * @param {HttpClient} http - The HttpClient instance used for HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Registers a new user.
   *
   * @param {RegisterRequest} userDetails - The details of the user being registered.
   * @return {Observable<any>} - An observable that emits the server response for the user registration.
   * @throws {Error} - If an error occurs during the user registration process.
   */
  public userRegistration(userDetails: RegisterRequest): Observable<any> {
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

  /**
   * Logs in the user using the provided user details.
   *
   * @param {LoginRequest} userDetails - The user details containing the login information.
   *
   * @return {Observable<LoginResponse>} - An Observable emitting the login response.
   */
  public userLogin(userDetails: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, userDetails, {
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


  /**
   * Retrieves all movies from the API.
   *
   * @return {Observable<Movie[]>} The observable that emits the array of movies.
   */
  public getAllMovies(): Observable<Movie[]> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Movie[]>(`${this.apiUrl}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves user data from the server.
   *
   * @param {string} username - The username of the user whose data needs to be loaded.
   * @return {Observable<User>} - An observable that emits the user data.
   */
  public loadUserData(username: string): Observable<User> {
    const token = localStorage.getItem('token');
    return this.http
      .get<User>(`${this.apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

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
   * Extracts the response data from the given object.
   *
   * @param {any} res - The response object to extract data from.
   * @returns {any} The extracted response data.
   */
  private extractResponseData(res: any): any {
    return res || {};
  }

  /**
   * Handles the error returned from an HTTP request.
   *
   * @param {HttpErrorResponse} error - The error object returned from the HTTP request.
   * @return {Error} The error message to be thrown as an Observable.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
    }
    const finalError = new Error('Something bad happened; please try again later.')
    return throwError(() => finalError);
  }
}
