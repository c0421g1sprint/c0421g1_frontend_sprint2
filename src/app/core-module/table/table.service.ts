import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITables} from "../../entity/ITables";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private api_table = 'http://localhost:8080/api/table';

  constructor(private http: HttpClient) { }

  //HauPT do at 19/11/2021
  getListTables(currentPage: number): Observable<ITables[] | any> {
    return this.http.get(this.api_table + '/list?page=' + currentPage);
  }

  //HauPT do at 19/11/2021
  searchTables(currentPage: number , tableCode: string , tableStatus: string): Observable<ITables[] | any> {
    if (tableStatus == '' ){
      return this.http.get(this.api_table + '/search?tableCode='+ tableCode + '&page=' +currentPage);
    }
    if (tableCode == '' ){
      return this.http.get(this.api_table + '/search?tableStatus='+ tableStatus + '&page=' +currentPage);
    }
    return this.http.get(this.api_table + '/search?tableCode='+ tableCode + '&tableStatus=' + tableStatus + '&page=' +currentPage);
  }

  //HauPT do at 23/11/2021
  deleteTables(tableId: number): Observable<any>{
    return this.http.patch(this.api_table + "/delete" , tableId);
  }
}
