import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * this componenet renders dialog for genre details
 */

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
})
export class GenreDialogComponent {
  /**
   * data passed to the dialog
   * @param data
   * @type {any}
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
