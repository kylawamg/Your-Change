import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-show-project-by-type',
  templateUrl: './show-project-by-type.component.html',
  styleUrls: ['./show-project-by-type.component.css']
})
export class ShowProjectByTypeComponent implements OnInit {
  projects:Observable<Array<object>>;
  constructor(private project: ProjectService, private route: ActivatedRoute) {

    }

  ngOnInit() {
   this.route.params
      .subscribe((params) => {
        console.log(params);
        this.project.getProjectByType(params.type).subscribe( projects => {
          console.log(projects);
          this.projects = projects
          console.log(this.projects);});
      })
  }

}
