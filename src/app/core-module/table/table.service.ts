import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITables} from "../../entity/ITables";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private urlTable = "http://localhost:8080/api/order/table"; //BaoHG
  private api_table = 'http://localhost:8080/api/table';

  constructor(private http: HttpClient) {
  }

  randomTableNull(): Observable<ITables | any> { //BaoHG
    return this.http.get(this.urlTable);
  }

  //HauPT do at 19/11/2021
  getListTables(currentPage: number): Observable<ITables[] | any> {
    return this.http.get(this.api_table + '/list?page=' + currentPage);
  }

  //HauPT do at 19/11/2021
  searchTables(currentPage: number, tableCode: string, tableStatus: string): Observable<ITables[] | any> {
    if (tableCode == '' && tableStatus == '') {
      return this.http.get(this.api_table + '/list?page=' + currentPage);
    }
    if (tableStatus == '') {
      return this.http.get(this.api_table + '/search?tableCode=' + tableCode + '&page=' + currentPage);
    }
    if (tableCode == '') {
      return this.http.get(this.api_table + '/search?tableStatus=' + tableStatus + '&page=' + currentPage);
    }
    return this.http.get(this.api_table + '/search?tableCode=' + tableCode + '&tableStatus=' + tableStatus + '&page=' + currentPage);
  }

  //HauPT do at 23/11/2021
  deleteTables(tableId: number): Observable<any> {
    return this.http.patch(this.api_table + "/delete", tableId);
  }

  //DucLVH do at 24/11/2021
  addWewTables(tables: ITables): Observable<any> {
    return this.http.post(this.api_table + '/add', tables);
  }

  findByIdTable(id: number): Observable<ITables | any> {
    return this.http.get(this.api_table + '/' + id);
  }

  update(tables: ITables): Observable<ITables | any> {
    return this.http.patch(this.api_table + '/update', tables);
  }
}
