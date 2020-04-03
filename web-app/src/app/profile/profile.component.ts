import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../service/profile.service";
import {user} from "../common/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId = '';
  name = '';
  sociallink = '';
  showProgressBar = false;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.profileService.getUser().subscribe((user: user) => {
      this.userId = user.userId;
      this.name = user.name;
      this.sociallink = user.socialLink;
      console.log('get user info : ', user);
    });
  }

  saveChnage() {
    this.showProgressBar = true;
    setTimeout(() => {
      this.profileService.update({userId: this.userId, name: this.name, socialLink: this.sociallink})
        .subscribe(res => {
          this.showProgressBar = false;
        }, error => {
          this.showProgressBar = false;
          console.log('profile save changes error: ', error)
        })
    }, 500);

  }
}
