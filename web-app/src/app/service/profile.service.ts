import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.url;

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    })
  };

  getUser() {
    const userId = localStorage.getItem('userId');
    console.log('profileservice userid : ', userId);
    if (userId) {

      return this.http.get(this.baseUrl + '/api/users/' + userId, this.httpOptions);
    } else
      return Observable.throw('userId notfound');

  }

  update(user: { userId, name, socialLink }) {
    const userId = localStorage.getItem('userId');
    if (userId)
      return this.http.put(this.baseUrl + '/api/users/' + userId, user, this.httpOptions);
    else Observable.throw('userid notfound');
  }
}


