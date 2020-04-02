import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  constructor(private http:HttpClient) { }

  login(credential:{userId,password}){
    return this.http.post('http://localhost:3000/auth/login', {
      userId: credential.userId,
      password: credential.password
    }).pipe(map((result: {token}) => {
      if(result && result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId',credential.userId);
        this.isAuthenticated = true;
        return true;
      }
      return false;
    }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.isAuthenticated = false;
  }

  isLogedIn() {
    return this.isAuthenticated;
  }
}
