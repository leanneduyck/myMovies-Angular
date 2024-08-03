import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * this componenet renders dialog for director details
 */

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
})
export class DirectorDialogComponent {
  /**
   * data passed to the dialog
   * @param data
   * @type {any}
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
