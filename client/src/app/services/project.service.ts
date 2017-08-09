import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
const baseURL = environment.apiUrl;

@Injectable()
export class ProjectService {
  project: object;
  options: { withCredentials:true };
  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getAllprojects() {
    return this.http.get(`${baseURL}/project/`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  createNewProject(project) {
    return this.http.post(`${baseURL}/project/new`, project, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  getProjectDetail(id) {
    return this.http.get(`${baseURL}/project/detail/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  editProject(project,id) {
    return this.http.put(`${baseURL}/project/edit/${id}`, this.options)
      .map((res) => res.json())
      .catch(this.handleError);
  }
  deleteProject(id) {
    return this.http.delete(`${baseURL}/project/delete/${id}`, this.options)
      .map((res) => res.json())
      .catch(this.handleError);
  }
  getProjectByType(type){
    return this.http.get(`${baseURL}/project/${type}`, this.options)
      .map((res) =>res.json())
      .catch(this.handleError);
  }
  getProjectByUser(creator){
    console.log(creator);
    return this.http.get(`${baseURL}/project/myprojects/${creator}`, this.options)
      .map((res) =>res.json())
      .catch(this.handleError);
  }
  getProjectsLocation(){
    return this.http.get(`${baseURL}/project/`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  addCandidate (info) {
    return this.http.put(`${baseURL}/project/addCandidate`, info, this.options)
      .map((res) => res.json())
      .catch(this.handleError);
  }
  acceptCandidate (info) {
    return this.http.put(`${baseURL}/project/acceptCandidate`, info, this.options)
      .map((res) => res.json())
      .catch(this.handleError);
  }
  declineCandidate (info) {
    return this.http.put(`${baseURL}/project/declineCandidate`, info, this.options)
      .map((res) => res.json())
      .catch(this.handleError);
  }
  deleteVolunteer (info){
    return this.http.put(`${baseURL}/project/deleteVolunteer`, info, this.options)
      .map((res) => res.json())
      .catch(this.handleError);
  }
}
