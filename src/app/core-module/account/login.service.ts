import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ILogin} from "../../entity/ILogin";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_LOGIN = "http://localhost:8080/api/account/";
  httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getLogin(data: ILogin):Observable<any>{
    return  this.http.post(this.API_LOGIN + "login", data, this.httpOptions )
  }

  getPassword(email: string){
    return  this.http.get(this.API_LOGIN + "refreshPassword?email=" + email);
  }
}
