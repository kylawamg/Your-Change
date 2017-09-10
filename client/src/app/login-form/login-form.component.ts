import { Component, OnInit, EventEmitter } from '@angular/core';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { Router } from '@angular/router';
//import {ModalModule} from "ngx-modal";

@Component({
  selector: 'login-user-root',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [ SessionService ]
})
export class LoginFormComponent implements OnInit {
  user: any;
  formInfo = {
    username: '',
    password: ''
  };
  error: string;
  constructor(private session: SessionService, private router: Router, private loggedin: LoggedinService) { }

  ngOnInit() {
    }

  login() {
      this.session.login(this.formInfo)
        .subscribe(
          (user) => this.successCb(user),
          (err) => this.errorCb(err)
        );
    }
  errorCb(err) {
    this.error = err;
    this.user = null;
  }
  successCb(user) {
    this.user = user;
    this.error = null;
    this.loggedin.checkLogged(user);
    this.router.navigate(['user/'+this.user._id])
  }
}
