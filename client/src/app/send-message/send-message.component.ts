import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { MessageService } from '../services/messages.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  userTo:any;
  user:any;
  msg:any;
  formInfo ={
    subject: '',
    content: '',
    to: '',
    from: ''
  }
  error:string;
  constructor(private route: ActivatedRoute,
  private session:SessionService, private loggedin: LoggedinService,
  private msgSvc: MessageService) { }

  ngOnInit() {
  //  this.loggedin.getEmitter().subscribe((user) => { this.user = user });
    this.user = this.loggedin.getUser();
    this.route.params
       .subscribe((params) => {
         this.session.getUserProfile(params.id).subscribe( userTo => {
           console.log(userTo);
           this.userTo = userTo
           console.log(this.userTo);});
       })

  }
  send(){
    this.formInfo.to = this.userTo._id;
    this.formInfo.from = this.user._id;
    this.msgSvc.createNewMessage(this.formInfo)
      .subscribe(
      (msg) => this.successCb(msg),
      (err) => this.errorCb(err)
      );

  }
  errorCb(err) {
    this.error = err;
    console.log(this.error)
    this.msg = null;
  }
  successCb(comment) {

    this.formInfo.content = ''
    this.error = "Mensaje enviado";
  }
}
