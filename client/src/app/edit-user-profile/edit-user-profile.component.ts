import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {
  user:any;
  formInfo = {
    username: '',
    password: '',
    name: '',
    address: '',
    city: '',
    country: '',
    email: ''
    
  };
  error: string;
  constructor(private session: SessionService, private router: Router, private loggedin: LoggedinService) { }

  ngOnInit() {
    this.session.isLoggedIn().subscribe( user => this.successCb(user));
    this.loggedin.getEmitter().subscribe(user => this.successCb(user));
  }
  edit() {

    this.session.editUser(this.formInfo, this.user._id)
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
