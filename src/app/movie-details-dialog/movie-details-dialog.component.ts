import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * this componenet renders dialog for movie details
 */

@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: './movie-details-dialog.component.html',
})
export class MovieDetailsDialogComponent {
  /**
   * creates movieDetailsDialogComponent
   * @param data
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  get movies(): any {
    return this.data.movies;
  }
}
