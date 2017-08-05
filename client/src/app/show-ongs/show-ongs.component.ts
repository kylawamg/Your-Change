import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-show-ongs',
  templateUrl: './show-ongs.component.html',
  styleUrls: ['./show-ongs.component.css']
})
export class ShowOngsComponent implements OnInit {
  ongs:Observable<Array<object>>;
  constructor(private route: ActivatedRoute, private session: SessionService) { }

  ngOnInit() {
    this.route.params
       .subscribe((params) => {
         console.log(params.type);
         this.session.getOngs(params.type).subscribe( ongs =>{
           console.log(ongs);
          this.ongs = ongs
         }

          );
       });
   }

  }
