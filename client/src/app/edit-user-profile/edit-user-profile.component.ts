import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {
  user: any;
  url:string;
  uploader: FileUploader;

  formInfo = {
    name: '',
    address: '',
    city: '',
    country: '',
    email: ''

  };
  error: string;
  feedback: string;
  constructor(private session: SessionService, private router: Router, private loggedin: LoggedinService) {

   }

  ngOnInit() {
    this.session.isLoggedIn().subscribe(user => this.successCb(user));
    this.loggedin.getEmitter().subscribe(user => this.successCb(user));


  }
  edit() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('name', this.formInfo.name);
      form.append('address', this.formInfo.address);
      form.append('city', this.formInfo.city);
      form.append('country', this.formInfo.country);
      form.append('email', this.formInfo.email);
    };

    this.uploader.uploadAll();
    /*  this.session.editUser(this.formInfo, this.user._id)
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
    this.uploader = new FileUploader({
      url:'http://localhost:3000/user/edit/'+this.user._id
    });
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
      this.router.navigate(['/']);
    }
    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };



  //  this.router.navigate(['user/profile/' + this.user._id])
  }
}
