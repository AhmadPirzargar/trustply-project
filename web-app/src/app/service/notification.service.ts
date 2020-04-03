import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {interval} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    })
  };

  send(notification: { from, to, message }) {
    return this.http.post(environment.url + '/api/notification', notification, this.httpOptions)
  }

  pollNewNotification() {
    return this.http.get(environment.url + '/api/notification', this.httpOptions);
  }
}
