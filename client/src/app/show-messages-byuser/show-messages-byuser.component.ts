import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { MessageService } from '../services/messages.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-show-messages-byuser',
  templateUrl: './show-messages-byuser.component.html',
  styleUrls: ['./show-messages-byuser.component.css']
})
export class ShowMessagesByuserComponent implements OnInit {
  user:any;
  messages:Array<object>;
  constructor(private loggedin: LoggedinService, private msgSvc: MessageService) {
}

  ngOnInit() {
    this.user =  this.loggedin.getUser();
    this.msgSvc.getUserMessages(this.user._id).subscribe( messages => {
    this.messages = messages
    });
  }
}
