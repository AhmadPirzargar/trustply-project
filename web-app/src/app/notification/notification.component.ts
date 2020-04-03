import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notification;
  @Output() deleteEvent = new EventEmitter();
  sentTime: Date;
  constructor() {
    this.sentTime = new Date;
  }

  ngOnInit(): void {
  }
  delete(){
    this.deleteEvent.emit(this.notification)
  }
}
