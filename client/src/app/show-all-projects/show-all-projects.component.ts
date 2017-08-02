import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
@Component({
  selector: 'app-show-all-projects',
  templateUrl: './show-all-projects.component.html',
  styleUrls: ['./show-all-projects.component.css']
})
export class ShowAllProjectsComponent implements OnInit {
  projects:Observable<Array<object>>;
  constructor(private project: ProjectService) { }

  ngOnInit() {
      this.projects = this.project.getAllprojects();
  }

}
