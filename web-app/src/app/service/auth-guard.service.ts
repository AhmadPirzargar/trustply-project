import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public router: Router,private authService: AuthService) {}

  async canActivate() {
    if (!this.authService.isLogedIn()) {
      await this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
