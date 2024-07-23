import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // endpoint: /users, registers a new user
  // userDetails can be any type
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    // uses POST method to make an API call
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // endpoint: /login, authenticates user
  // userDetails can be any type
  public userLogin(userDetails: any): Observable<any> {
    return (
      this.http
        // uses POST method to make an API call
        .post(apiUrl + 'login', userDetails)
        .pipe(catchError(this.handleError))
    );
  }

  // endpoint: /movies, returns list of all movies to logged-in users
  // no parameters needed, observable can be of any type
  public getAllMovies(): Observable<any> {
    // retrieves authentication token from local storage
    const token = localStorage.getItem('token');
    return (
      this.http
        // uses GET method to make an API call, includes token in header
        .get(apiUrl + 'movies', {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    );
  }

  // endpoint: /movies/:movieId, returns movieView to logged-in users
  // movieId is a string, observable can be of any type
  public getMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return (
      this.http
        // uses GET method to make an API call, includes token in header
        .get(apiUrl + `movies/${movieId}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    );
  }

  // endpoint: /movies/:movieId/director, returns directorView to logged-in users
  // director is a string, observable can be of any type
  public getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return (
      this.http
        // uses GET method to make an API call, includes token in header
        .get(apiUrl + `movies/${director}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    );
  }

  // endpoint: /movies/:movieId/genre, returns genreView to logged-in users
  // genre is a string, observable can be of any type
  public getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return (
      this.http
        // uses GET method to make an API call, includes token in header
        .get(apiUrl + `movies/${genre}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    );
  }

  // endpoint: /users/:username, returns profileView to logged-in users
  // username is a string, observable can be of any type
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return (
      this.http
        // uses GET method to make an API call, includes token in header
        .get(apiUrl + `users/${username}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    );
  }

  // endpoint: /users/:username/movies/:movieId, allows users to add a movie to their favorites
  // movieId is a string, observable can be of any type
  public addFavoriteMovie(movieId: string): Observable<any> {
    // retrieves authentication token and username from local storage
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return (
      this.http
        // uses POST method to make an API call, includes token in header
        .post(apiUrl + `users/${username}/movies/${movieId}`, movieId, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(catchError(this.handleError))
    );
  }

  // endpoint: /users/:username/movies/:movieId, allows users to remove a movie from their favorites
  // movieId is a string, observable can be of any type
  public removeFavoriteMovie(movieId: string): Observable<any> {
    // retrieves authentication token and username from local storage
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return (
      this.http
        // uses DELETE method to make an API call, includes token in header
        .delete(apiUrl + `users/${username}/movies/${movieId}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(catchError(this.handleError))
    );
  }

  // endpoint: /users/:username, allows users to update their user info (username)
  // userDetails can be any type
  public editUserInfo(userDetails: any): Observable<any> {
    // retrieves authentication token and username from local storage
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return (
      this.http
        // uses PUT method to make an API call, includes token in header
        .put(apiUrl + `users/${username}`, userDetails, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(catchError(this.handleError))
    );
  }

  // endpoint: /users/:username, allows users to delete account
  // no parameters needed, observable can be of any type
  public deleteUser(): Observable<any> {
    // retrieves authentication token and username from local storage
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return (
      this.http
        // uses DELETE method to make an API call, includes token in header
        .delete(apiUrl + `users/${username}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(catchError(this.handleError))
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    return res || {};
  }

  // Error handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
