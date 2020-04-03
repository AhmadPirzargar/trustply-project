import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {NotificationService} from "../service/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hasErr = false;
  form: FormGroup;
  users = [];
  showProgressbar = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.userService.getUsers().subscribe((users: []) => {
      this.users = users;
    })
  }

  onSubmit() {
    this.hasErr = this.form.value.userId === localStorage.getItem('userId');
    if (this.hasErr) return;
    this.showProgressbar = true;
    this.notificationService.send(
      {
        from: localStorage.getItem('userId'),
        to: this.form.value.userId,
        message: this.form.value.message
      }).subscribe(result => {
      this.showProgressbar = false;
      this.form.reset();
    }, err => {
      this.showProgressbar = false;
    })
  }
}
