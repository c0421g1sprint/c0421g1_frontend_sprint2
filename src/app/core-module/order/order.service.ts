import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private API = "http://localhost:8080/api/order";
  constructor(private http: HttpClient) { }


  getIncomeWithDate(startDate: string, endDate: string): Observable<any>{
    return this.http.get<any>(this.API + "/income-date" + "?startDate=" + startDate + "&endDate=" + endDate);
  }

  getStatisticsIncome(): Observable<any>{
    return this.http.get<any>(this.API + "/income-statistics");
  }
}
