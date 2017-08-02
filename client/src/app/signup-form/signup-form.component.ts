import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  user: any;
  formInfo = {
    username: '',
    password: '',
    name: '',
    address: '',
    city: '',
    country: '',
    email: '',
    type: ''
  };
  error: string;

  constructor(private session: SessionService, private router: Router, private loggedin: LoggedinService) { }

  ngOnInit() {
  }
  signup() {
    console.log(this.formInfo.type);
    this.session.signup(this.formInfo)
      .subscribe(
        (user) => this.successCb(user),
        (err) => this.errorCb(err)
    );
  }

  errorCb(err) {
    this.error = err;
    console.log(this.error)
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
    this.loggedin.checkLogged(user);
    this.router.navigate(['user/'+this.user._id])
  }
}
