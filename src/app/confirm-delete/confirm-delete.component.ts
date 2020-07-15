import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {
  @Output() confirmationok = new EventEmitter();
  @Output() confirmation = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  Onconfirmation() {

    this.confirmationok.emit();
    this.dialogRef.close();
  }
  OnCancelconfirmation() {
    this.confirmation.emit();
    this.dialogRef.close();
  }
}
