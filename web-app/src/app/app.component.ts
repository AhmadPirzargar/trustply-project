import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";
import {interval} from "rxjs/index";
import {NotificationService} from "./service/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {NotificarionDialog} from "./notification/dialog/notificarion.dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Trsutply App';
  notifies = [{from:'a',to:'b',message:'hellow'}];

  constructor(public authService: AuthService,
              private notificationService: NotificationService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    interval(5000).subscribe(x => {
      this.notificationService.pollNewNotification()
        .subscribe((notifies: []) => {
          if (notifies && notifies.length > 0)
            notifies.forEach(notify => this.notifies.push(notify))
        })
    });
  }


  openNotifications(): void {
    if (this.notifies.length > 0) {
      const dialogRef = this.dialog.open(NotificarionDialog, {
        width: '450px',
        data: this.notifies
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

  }
}
