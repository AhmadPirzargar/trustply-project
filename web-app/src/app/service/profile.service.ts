import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.url;

  constructor(private http: HttpClient) {
  }

  getUser() {
    const userId = localStorage.getItem('userId');
    if (userId)
      return this.http.get(this.baseUrl + '/api/users/' + userId);
    else
      return Observable.throw('userId notfound');

  }

  update(user: { userId, name, socialLink }) {
    const userId = localStorage.getItem('userId');
    if (userId)
      return this.http.put(this.baseUrl + '/api/users/' + userId, user);
    else Observable.throw('userid notfound');
  }
}


