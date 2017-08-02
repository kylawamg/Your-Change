import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { LoggedinService } from '../services/loggedin.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    user:any;
  constructor(private route: ActivatedRoute,private session: SessionService,private router : Router, private loggedin: LoggedinService) {

    route.params
  .mergeMap( p => session.getUserProfile(p.id) )
  .subscribe( user => {

    this.user=user;
  });}

  ngOnInit() {
  }

}
