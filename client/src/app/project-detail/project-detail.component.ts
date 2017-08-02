import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: any;
  error:string;
  constructor(private router: Router, private projectSvc: ProjectService) { }

  ngOnInit() {
  }

  getProjectDetail(id){
    this.projectSvc.getProjectDetail(id)
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
