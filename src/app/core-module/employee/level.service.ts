import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ILevel} from "../../entity/ILevel";
import {Observable} from "rxjs";
import {StorageService} from "../account/storage.service";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private httpOptions;
  //PhucNK
  private urlGetLevelList='http://localhost:8080/api/employee/listLevel'
  constructor(private http: HttpClient, private storageService: StorageService) {
    this.httpOptions ={
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'DUNG ' + `${this.storageService.getToken()}`}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }
  //PhucNK
  findAllLevel(): Observable<ILevel[] | any>{
    return this.http.get(this.urlGetLevelList, this.httpOptions);
  }
}
