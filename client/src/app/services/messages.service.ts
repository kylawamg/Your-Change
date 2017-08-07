import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
const baseURL = environment.apiUrl;


@Injectable()
export class MessageService {
  project: object;
  options: { withCredentials:true };
  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  createNewMessage (msg){
    console.log("servicee "+ msg);
    return this.http.post(`${baseURL}/messages/new`, msg, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  getUserMessages(id){
    console.log("servicio "+id);
    return this.http.get(`${baseURL}/messages/showMessages/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
