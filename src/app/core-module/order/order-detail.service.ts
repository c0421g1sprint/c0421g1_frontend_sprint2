import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {IOrders} from "../../entity/IOrders";
import {ITables} from "../../entity/ITables";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private orderUrlApi = 'http://localhost:8080/api/order/on-service';
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  findOrderById(id: number): Observable<any> {
    return this.httpClient.get<IOrders>(this.orderUrlApi + '/' + id, this.httpOptions).pipe();
  }

  showTableOnService(page: number): Observable<ITables> {
    return this.httpClient.get<ITables>(this.orderUrlApi + '?page=' +page );
  }

  changeTableOnServiceStatus(id: number): Observable<any> {
    return this.httpClient.patch<ITables>(this.orderUrlApi + '/handle/' + id, this.httpOptions).pipe();
  }

  resetTableStatus(id: number): Observable<any> {
    return this.httpClient.patch<ITables>(this.orderUrlApi + '/reset/' + id, this.httpOptions).pipe();
  }
}
