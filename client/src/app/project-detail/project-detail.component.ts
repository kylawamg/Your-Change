import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { RelationsService } from '../services/relations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  relation:any;
  project: any;
  relations: Array <object>;
  comments: Array<object>;
  error: string;
  user: any;
  formInfo = {
    content: '',
    _project: '',
    _creator: ''
  }
  addCandidateInfo = {
    userId : '',
    projectId : ''
  };

  constructor(private router: Router,
    private projectSvc: ProjectService,
    private route: ActivatedRoute,
    private commentSvc: CommentService,
    private session: SessionService,
    private loggedin: LoggedinService,
    private relationsSvc: RelationsService) {

  }
  ngOnInit() {
    this.session.isLoggedIn().subscribe(user => this.successCbUser(user));

    this.route.params
      .mergeMap(p => this.projectSvc.getProjectDetail(p.id))
      .subscribe(project => {
        this.project = project;
      });
    this.route.params
      .mergeMap(p => this.relationsSvc.getRelationsByProject(p.id))
      .subscribe(relations => {
        this.relations = relations;
      });
    this.route.params
      .subscribe((params) => {
        this.commentSvc.getCommentsByProject(params.id).subscribe(comments => {
          this.comments = comments
        });
      })
  }
  createComment() {
    this.formInfo._project = this.project._id;
    this.formInfo._creator = this.user._id;
    this.commentSvc.createNewComent(this.formInfo)
      .subscribe(
      (comment) => this.successCb(comment));
  }
  addCandidate () {
    this.addCandidateInfo.userId =this.user._id;
    this.addCandidateInfo.projectId = this.project._id;
    this.relationsSvc.createNewRelation(this.addCandidateInfo).subscribe(
      (relation) => {
        this.relations.push(relation);
        this.relation = relation;
      })}
  declineCandidate(id ){
    this.relationsSvc.deleteRelation(id).subscribe((dltRelation) => {
      this.relations = this.relations.filter(function( obj:any ) {
          return obj._id !== dltRelation._id;
      });
    })
  }

  acceptCandidate(relationId){
    var  info = {
        relationId: relationId,
        status: 'Accepted'
      }
      this.relationsSvc.updateRelation(info).subscribe((relation) => {
          this.successCbRelation(relation);
      })
    }
    deleteVolunteer(relationId){
      var  info = {
          relationId: relationId,
          status: 'Candidate'
        }
        this.relationsSvc.updateRelation(info).subscribe((relation) => this.successCbRelation(relation))
      }

  successCbUser(val) {
    this.user = val;

    this.relationsSvc.getSpecificRelation(this.user._id, this.project._id).subscribe((relation) => {
      this.relation = relation;
    });
    this.error = null;

  }

  errorCb(err) {
    this.error = err;
    this.project = null;
  }
  successCbProject(project){
  this.project = project;
  }
  successCbRelation(relation){
    this.relations = this.relations.filter(function( obj:any ) {
      return obj._id !== relation._id;
    });
    this.relations.push(relation);

  }
  successCb(comment) {
    this.comments.push({content: comment.content, creator: this.user, created_at:comment.created_at})
    this.formInfo.content = ''
    this.error = null;
  }
}
