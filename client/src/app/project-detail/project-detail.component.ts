import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: any;
  error:string;
  formInfo = {
    description: ''
  }
  constructor(private router: Router, private projectSvc: ProjectService, private route: ActivatedRoute) {
  route.params
  .mergeMap( p => projectSvc.getProjectDetail(p.id) )
  .subscribe( project => {

    this.project=project;
  });}
  ngOnInit() {

  }


}
