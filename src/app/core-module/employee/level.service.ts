import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILevel} from "../../entity/ILevel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  //PhucNK
  private urlGetLevelList='http://localhost:8080/api/employee/listLevel'
  constructor(private http: HttpClient) {

  }
  //PhucNK
  findAllLevel(): Observable<ILevel[]>{
    return this.http.get<ILevel[]>(this.urlGetLevelList);
  }
}
