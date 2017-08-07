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
  messages:Observable<Array<object>>;
  constructor(private loggedin: LoggedinService, private msgSvc: MessageService) { }

  ngOnInit() {
      console.log("entra en showmsgs");
      this.loggedin.getEmitter().subscribe((user) => { this.user = user
        this.msgSvc.getUserMessages(user._id).subscribe( messages => {
          console.log(messages);
          this.messages = messages
          console.log(this.messages);});
      })}

}
