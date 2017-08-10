import { Component, OnInit, ElementRef, NgZone, ViewChild  } from '@angular/core';
import { SessionService } from '../services/session.service';
import { LoggedinService } from '../services/loggedin.service';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from  '@agm/core';
import { FileUploader } from "ng2-file-upload";
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
  url: `${environment.apiUrl}/project/new`
});
  feedback: any;
  project:any;
  user:any;
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
    creator: '',
    position: {
      longitud: 0,
      latitud: 0
    }
  };
  public latitude: number;
   public longitude: number;
   public searchControl: FormControl;
   public zoom: number;
   public formatted_address: string;

  error:string;

   @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private router:Router, private projectSvc:ProjectService,
     private session:SessionService, private loggedin: LoggedinService,
     private mapsAPILoader: MapsAPILoader,
   private ngZone: NgZone) {}

  ngOnInit() {
    this.session.isLoggedIn().subscribe( user => this.successCbUser(user));
    this.loggedin.getEmitter().subscribe(user => this.successCbUser(user));
    //set google maps defaults
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
      this.router.navigate(['/']);
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
   this.zoom = 14;
   this.latitude = 39.8282;
   this.longitude = -98.5795;

   //create search FormControl
   this.searchControl = new FormControl();

   //set current position
   this.setCurrentPosition();

   //load Places Autocomplete
   this.mapsAPILoader.load().then(() => {
     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
       types: ["address"]
     });
     autocomplete.addListener("place_changed", () => {
       this.ngZone.run(() => {
         //get the place result
         let place: google.maps.places.PlaceResult = autocomplete.getPlace();


         //verify result
         if (place.geometry === undefined || place.geometry === null) {
           return;
         }

         //set latitude, longitude and zoom
         this.latitude = place.geometry.location.lat();
         this.longitude = place.geometry.location.lng();
         this.formatted_address = place.formatted_address;
         //this.zoom = 14;


       });
     });
   });
  }
  private setCurrentPosition() {
     if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition((position) => {
         this.latitude = position.coords.latitude;
         this.longitude = position.coords.longitude;
         //this.zoom = 14;
       });
     }
   }
  createProject() {
  /*  position: {
      longitud: Number,
      latitud: Number
    },*/
    this.formInfo.position.longitud = this.longitude;
    this.formInfo.position.latitud = this.latitude;
    this.formInfo.creator = this.user._id
    console.log(this.formInfo);

    this.uploader.onBuildItemForm = (item, form) => {
    form.append('title', this.formInfo.title);
    form.append('type', this.formInfo.type);
    form.append('description', this.formInfo.description);
    form.append('profile', this.formInfo.profile);
    form.append('tags', this.formInfo.tags);
    form.append('deadLine', this.formInfo.deadLine);
    form.append('startDate', this.formInfo.startDate);
    form.append('endDate', this.formInfo.endDate);
    form.append('position', JSON.stringify(this.formInfo.position));
    form.append('vacancies', this.formInfo.vacancies);
    form.append('creator', this.formInfo.creator);
       };

      this.uploader.uploadAll();
  /*  this.projectSvc.createNewProject(this.formInfo)
      .subscribe(
        (project) => this.successCb(project),
        (err) => this.errorCb(err)
    );*/
  }

  successCbUser(val) {
    this.user = val;
    this.error = null;

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
