import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from './../../_helpers/api.config';

const REFRESH_API = API + "auth/user/login/refresh/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // login, register

  refreshToken(token: string) {
    return this.http.post(REFRESH_API, {
      refreshToken: token
    }, httpOptions);
  }
}
