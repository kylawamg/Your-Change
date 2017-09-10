import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
const baseURL = environment.apiUrl;


@Injectable()
export class CommentService {
  project: object;
  options: { withCredentials:true };
  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }
  createNewComent (comment){
    return this.http.post(`${baseURL}/comment/new`, comment, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  getCommentsByProject(id){
    return this.http.get(`${baseURL}/comment/showComments/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
