import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
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
    vacancies: ''
  };
  error:string;
  constructor(private router:Router, private projectSvc:ProjectService) { }

  ngOnInit() {
  }
  createProject() {

    this.projectSvc.createNewProject(this.formInfo)
      .subscribe(
        (project) => this.successCb(project),
        (err) => this.errorCb(err)
    );
  }

  errorCb(err) {
    this.error = err;
    console.log(this.error)
    this.project = null;
  }

  successCb(project) {
    this.project = project;
    this.error = null;
    this.router.navigate(['/'])
  }
}
