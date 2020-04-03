import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AuthService} from "./service/auth.service";
import {interval} from "rxjs/index";
import {NotificationService} from "./service/notification.service";
import {DialogPosition, MatDialog} from "@angular/material/dialog";
import {NotificarionDialog} from "./notification/dialog/notificarion.dialog";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  notifies = [{from:'a',to:'b',message:'hellow'}];
  @ViewChild('notifyBtn', { static: false }) public myButtonRef: ElementRef;
  @ViewChild("notifyBtn", { read: TemplateRef }) tpl: TemplateRef<any>;
  @ViewChild("notifyBtn", { read: ViewContainerRef }) ctr: ViewContainerRef;

  constructor(public authService: AuthService,
              private notificationService: NotificationService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    interval(5000).subscribe(x => {
      console.log('app conpoment interval retrived # : ', x);
      this.notificationService.pollNewNotification()
        .subscribe((notifies: []) => {
          console.log('app conpoment interval retrived notifies : ', notifies);
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
  ngAfterViewInit(): void {

  }

}
