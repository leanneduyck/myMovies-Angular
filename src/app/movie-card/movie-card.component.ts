import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() movie: any;
  @Input() isFavorite: boolean = false;
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  // This method retrieves all movies from the database
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      for (let x in this.movies) {
        const isFavorited = this.determineIfFavorited(this.movies[x]);
        this.movies[x].isFavorited = isFavorited;
      }
      return this.movies;
    });
  }

  // This method opens the genre dialog
  openGenreDialog(genre: any) {
    this.dialog.open(GenreDialogComponent, {
      data: { genre: genre },
    });
  }

  // This method opens the director dialog
  openDirectorDialog(director: any) {
    this.dialog.open(DirectorDialogComponent, {
      data: { director: director },
    });
  }

  // This method opens the movie details dialog
  openMovieDetailsDialog(movie: any) {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: { details: movie },
    });
  }

  determineIfFavorited(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.FavoriteMovies.includes(movie._id)) {
      return true;
    } else {
      return false;
    }
  }

  // not sure if I need this?
  // This method checks if the movie is in the user's list of favorites
  // checkIfFavorite(): void {
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');
  //   this.isFavorite = user.FavoriteMovies.includes(this.movie._id);
  // }

  // This method toggles the favorite status of a movie
  toggleFavoriteStatus(movie: any): void {
    const isFavorite = this.determineIfFavorited(movie);
    if (isFavorite) {
      this.removeFromFavorites(movie);
    } else {
      this.addToFavorites(movie);
    }
  }

  // This method adds a movie to the user's list of favorites
  addToFavorites(movie: any): void {
    if (!movie || !movie?._id) {
      console.error('Cannot add to favorites. Invalid movie object:', movie);
      return;
    }
    this.fetchApiData.addToFavorites(movie._id).subscribe(
      (response) => {
        this.snackBar.open(`${movie.Title} added to favorites`, 'Close', {
          duration: 2000,
        });
        localStorage.setItem('user', JSON.stringify(response));
        const movieIndex = this.movies.findIndex((m) => m._id === movie._id);
        this.movies[movieIndex].isFavorited = true;
      },
      (error) => {
        this.snackBar.open('Something went wrong. Please try again.', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  // This method removes a movie from the user's list of favorites
  removeFromFavorites(movie: any): void {
    if (!movie || !movie._id) {
      console.error(
        'Cannot remove from favorites. Invalid movie object:',
        movie
      );
      return;
    }
    this.fetchApiData.removeFromFavorites(movie._id).subscribe(
      (response) => {
        this.snackBar.open(`${movie.Title} removed from favorites`, 'Close', {
          duration: 2000,
        });
        localStorage.setItem('user', JSON.stringify(response));
        const movieIndex = this.movies.findIndex((m) => m._id === movie._id);
        this.movies[movieIndex].isFavorited = false;
      },
      (error) => {
        this.snackBar.open('Something went wrong. Please try again.', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
