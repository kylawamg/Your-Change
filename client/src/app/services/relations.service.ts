import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
const baseURL = environment.apiUrl;


@Injectable()
export class RelationsService {
  project: object;
  options: { withCredentials:true };
  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getRelationsByProject (id) {
    return this.http.get(`${baseURL}/relations/showRelations/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  createNewRelation (info){
    return this.http.post(`${baseURL}/relations/new`, info, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  updateRelation(info){
    return this.http.put(`${baseURL}/relations/updateStatus`, info, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  deleteRelation(id){
    return this.http.delete(`${baseURL}/relations/delete/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  getSpecificRelation(idUser,idProject){
    return this.http.get(`${baseURL}/relations/getSpecific?userId=${idUser}&projectId=${idProject}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
