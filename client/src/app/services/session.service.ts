import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
const baseURL = environment.apiUrl;

@Injectable()
export class SessionService {

  options: Object = {withCredentials:true};
  user:object;
  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(baseURL+`/user/signup`, user,{})
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {

    return this.http.post(baseURL+`/user/login`, user,this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  editUser(user, userId) {
    return this.http.post(baseURL+`/user/edit/`+userId, user,this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  getUserProfile (id){
    return this.http.get(`${baseURL}/user/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  logout() {
    return this.http.post(`${baseURL}/user/logout`,{},this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(baseURL+`/user/loggedin`, {withCredentials:true})
      .map(res => res.json())
      .catch((err) => this.handleError(err));
  }

}
