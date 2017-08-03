import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
@Component({
  selector: 'app-show-projects-by-user',
  templateUrl: './show-projects-by-user.component.html',
  styleUrls: ['./show-projects-by-user.component.css']
})
export class ShowProjectsByUserComponent implements OnInit {

  
    projects:Observable<Array<object>>;
  constructor(private project: ProjectService, private route: ActivatedRoute, private session:SessionService, private loggedin: LoggedinService) { }

  ngOnInit() {
    this.route.params
       .subscribe((params) => {

         this.project.getProjectByUser(params.creator).subscribe( projects => {
           console.log(projects);
           this.projects = projects
           console.log(this.projects);});
       })
  }


}
