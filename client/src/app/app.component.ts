import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';
import { LoggedinService } from './services/loggedin.service';
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: any;
  error: any;

  constructor(private session: SessionService, private router: Router, private loggedin: LoggedinService) {
    loggedin.getEmitter().subscribe((user) => { this.user = user });

  }
  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
      (user) => {this.successCb(user); console.log(user)
        ;}
      );

  }

  logout() {
    this.session.logout()
      .subscribe(
      () => this.logOutSucess(null),
      (err) => this.errorCb(err)
      );
  }
  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.loggedin.checkLogged(user);
    this.error = null;
  }
  logOutSucess(user) {
    this.router.navigate([''])
    this.loggedin.checkLogged(null);
    this.user = null;
  }
}
