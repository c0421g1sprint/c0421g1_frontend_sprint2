import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITables} from "../../entity/ITables";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseURL = 'http://localhost:8080/api/table';
  constructor(private http: HttpClient) { }

  addWewTables(tables: ITables,): Observable<any>{
    return this.http.post(this.baseURL + '/add/', tables);
  }

  findByIdTable(id: number): Observable<ITables | any> {
    return this.http.get(this.baseURL + '/' + id);
  }

  update(tables: ITables): Observable<ITables | any> {
    console.log(tables)
    return this.http.patch(this.baseURL+'/update', tables);
  }

}
