import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  error:string;
  project:any;
  formInfo = {
    title: '',
    type: '',
    description: '',
    deadLine: '',
    profile: '',
    tags: [],
    startDate: '',
    endDate: '',
    vacancies: '',
    creator: ''
  };

  constructor(private projectSvc: ProjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
      .mergeMap(p => this.projectSvc.getProjectDetail(p.id))
      .subscribe(project => {
        this.project = project;
      });
  }
  edit() {
    this.route.params
    .subscribe((params) => {
      this.projectSvc.editProject(this.formInfo, params.id)
        .subscribe(
          (project) => this.successCb(project),
          (err) => this.errorCb(err)
      );
    })
  }
  errorCb(err) {
    this.error = err;
    this.project = null;
  }
  successCb(project) {
    this.project =project;
    this.error = null;
    this.router.navigate(['project/detail/'+this.project._id])
  }
}
