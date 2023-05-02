import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-delete-contribute-modal',
  templateUrl: './delete-contribute-modal.component.html',
  styleUrls: ['./delete-contribute-modal.component.css']
})
export class DeleteContributeModalComponent {

  constructor(public dialogRef: MatDialogRef<DeleteContributeModalComponent>) {}

}

