import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
