import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'notification-dialog',
  template: `
    <h1 mat-dialog-title>Notifications</h1>
    <div mat-dialog-content>
      <app-notification *ngFor="let n of data" (deleteEvent)="deleteNotification($event)" [notification]="n" ></app-notification>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close cdkFocusInitial>Ok</button>
    </div>
  `
})
export class NotificarionDialog {

  constructor(
    public dialogRef: MatDialogRef<NotificarionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: [{from,to,message}]) {
    console.log('dialog constructor data : ', data)
  }

  deleteNotification(n) {
    const ind = this.data.findIndex(itm => (itm.from === n.from && itm.message === n.message && itm.to === n.to));
    this.data.splice(ind,1);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
