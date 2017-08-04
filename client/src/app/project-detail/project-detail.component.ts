import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: any;
  comments:Observable<Array<object>>;
  error:string;
  user:any;
  formInfo = {
    content: '',
    _project: '',
    _creator: ''
  }
  constructor(private router: Router, private projectSvc: ProjectService, private route: ActivatedRoute, private commentSvc: CommentService, private session: SessionService, private loggedin: LoggedinService) {
  route.params
  .mergeMap( p => projectSvc.getProjectDetail(p.id) )
  .subscribe( project => {
    this.project=project;
  });

}
  ngOnInit() {
    this.session.isLoggedIn().subscribe( user => this.successCbUser(user));
    this.loggedin.getEmitter().subscribe(user => this.successCbUser(user));
    this.route.params
     .subscribe((params) => {
       console.log(params);
       this.commentSvc.getCommentsByProject(params.id).subscribe( comments =>  this.comments = comments);
     })

  }

  createComment() {
      this.formInfo._project = this.project._id;
      this.formInfo._creator = this.user._id;
      this.commentSvc.createNewComent(this.formInfo)
        .subscribe(
          (project) => this.successCb(project),
          (err) => this.errorCb(err)
        );
  }
  successCbUser(val) {
    this.user = val;
    this.error = null;

  }
  errorCb(err) {
    this.error = err;
    console.log(this.error)
    this.project = null;
  }
  successCb(project) {
    this.project = project;
    this.error = null;
    this.router.navigate(['/projects/detail/',this.project._id])
  }
}
