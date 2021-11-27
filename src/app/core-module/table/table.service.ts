import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ITables} from "../../entity/ITables";
import {Observable} from "rxjs";
import {StorageService} from "../account/storage.service";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private urlTable = "http://localhost:8080/api/order/table"; //BaoHG
  private api_table = 'http://localhost:8080/api/table';

  private httpOptions;

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'DUNG ' + `${this.storageService.getToken()}`
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }

  randomTableNull(): Observable<ITables | any> { //BaoHG
    return this.http.get(this.urlTable, this.httpOptions);
  }

  //HauPT do at 19/11/2021
  getListTables(currentPage: number): Observable<ITables[] | any> {
    return this.http.get(this.api_table + '/list?page=' + currentPage, this.httpOptions);
  }

  //HauPT do at 19/11/2021
  searchTables(currentPage: number, tableCode: string, tableStatus: string): Observable<ITables[] | any> {
    if (tableCode == '' && tableStatus == '') {
      return this.http.get(this.api_table + '/list?page=' + currentPage, this.httpOptions);
    }
    if (tableStatus == '') {
      return this.http.get(this.api_table + '/search?tableCode=' + tableCode + '&page=' + currentPage, this.httpOptions);
    }
    if (tableCode == '') {
      return this.http.get(this.api_table + '/search?tableStatus=' + tableStatus + '&page=' + currentPage, this.httpOptions);
    }
    return this.http.get(this.api_table + '/search?tableCode=' + tableCode + '&tableStatus=' + tableStatus + '&page=' + currentPage, this.httpOptions);
  }

  //HauPT do at 23/11/2021
  deleteTables(tableId: number): Observable<any> {
    return this.http.patch(this.api_table + "/delete", tableId, this.httpOptions);
  }

  //DucLVH do at 24/11/2021
  addWewTables(tables: ITables): Observable<any> {
    return this.http.post(this.api_table + '/add', tables, this.httpOptions);
  }

  findByIdTable(id: number): Observable<ITables | any> {
    return this.http.get(this.api_table + '/' + id, this.httpOptions);
  }

  update(tables: ITables): Observable<ITables | any> {
    return this.http.patch(this.api_table + '/update', tables, this.httpOptions);
  }
}
