import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    })
  };
  getUsers() {
    return this.http.get(environment.url + '/api/users',this.httpOptions);
  }
}
