import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IEmployee} from "../../entity/IEmployee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {
  }
  // xem thông tin user by Nhật
  getUserDetail(userDetail:any): Observable<IEmployee|any>{
    return this.http.get('http://localhost:8080/api/employee/userDetail?name='+userDetail)
  }
}
