import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import {environment} from '../../environments/environment';
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
  url: `${environment.apiUrl}/user/signup`
});

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
  feedback: any;
  constructor(private session: SessionService, private router: Router, private loggedin: LoggedinService) { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
      this.router.navigate(['/']);
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }
  signup() {

    this.uploader.onBuildItemForm = (item, form) => {
     form.append('username', this.formInfo.username);
     form.append('password', this.formInfo.password);
     form.append('name', this.formInfo.name);
     form.append('address', this.formInfo.address);
     form.append('city', this.formInfo.city);
     form.append('country', this.formInfo.country);
     form.append('email', this.formInfo.email);
     form.append('type', this.formInfo.type);

   };

  this.uploader.uploadAll();

  /*  console.log(this.formInfo.type);
    this.session.signup(this.formInfo)
      .subscribe(
        (user) => this.successCb(user),
        (err) => this.errorCb(err)
    );*/
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
