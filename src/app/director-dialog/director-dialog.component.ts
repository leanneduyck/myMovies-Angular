import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
})
export class DirectorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
