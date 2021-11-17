import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IOrders} from "../../entity/IOrders";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private api_url = "http://localhost:8080/api/order";
  constructor(private http: HttpClient) { }

  //DanhNT
  showBillList(orderCode: string, createDate: string, page: number):Observable<IOrders[]|any>{
    return this.http.get(this.api_url+"/list/"+orderCode+"/"+createDate+"?page="+page);
  }
}
