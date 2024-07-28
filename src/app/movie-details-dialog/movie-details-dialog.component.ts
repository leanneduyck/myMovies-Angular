import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: './movie-details-dialog.component.html',
})
export class MovieDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  get movies(): any {
    return this.data.movies;
  }
}
