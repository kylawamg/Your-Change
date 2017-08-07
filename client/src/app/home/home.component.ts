import { Component, OnInit, NgModule, Injector, ApplicationRef, ComponentFactoryResolver, NgZone, ElementRef, ViewChild } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

//  locations: Observable<Array<object>>;
locations: Array<object>=[];
  constructor(private projectSvc: ProjectService) {
    this.projectSvc.getAllprojects().subscribe(projects =>{
      this.locations = projects
      console.log(this.locations);
    }

    );

  }
  ngOnInit() {

  }
}
