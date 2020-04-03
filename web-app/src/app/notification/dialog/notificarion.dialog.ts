import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'notification-dialog',
  template: `
    <h1 mat-dialog-title>Notifications</h1>
    <div mat-dialog-content>
      <app-notification *ngFor="let n of data" [notification]="n" ></app-notification>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
    </div>
  `
})
export class NotificarionDialog {

  constructor(
    public dialogRef: MatDialogRef<NotificarionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('dialog constructor data : ', data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
