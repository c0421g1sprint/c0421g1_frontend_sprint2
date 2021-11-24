import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILevel} from "../../entity/ILevel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private urlGetLevelList='http://localhost:8080/api/employee/listLevel'
  constructor(private http: HttpClient) {

  }

  findAllLevel(): Observable<ILevel[]>{
    return this.http.get<ILevel[]>(this.urlGetLevelList);
  }
}
