import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  lat1: number = 50.678418;
  lng1: number = 8.809007;
  locations: Array<object>;
  constructor(private projectSvc: ProjectService) {


}
  ngOnInit() {
    this.projectSvc.getAllprojects()
        .subscribe(
            projects => {
                this.locations = projects;
                console.log(this.locations);
            },
            error => console.error(error)
        );
    console.log("from outside subscribe");

  }

}
