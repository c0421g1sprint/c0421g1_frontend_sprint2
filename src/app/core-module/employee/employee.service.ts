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

  private url = "http://localhost:8080/api/employee/"

  //MinhNN
  getAllEmployee(page: number): Observable<IEmployee[] | any> {
    return this.http.get(this.url + "list" + "?page=" + page);
  }

  //MinhNN
  findById(id: number): Observable<IEmployee | any> {
    return this.http.get(this.url + id);
  }

  //MinhNN
  deleteEmployee(id: number, iEmployee: IEmployee): Observable<IEmployee|any> {
    return this.http.patch(this.url + "delete/" + id, iEmployee);
  }

  //MinhNN
  search(page: number, username: String, nameEmployee: String, phone: String): Observable<IEmployee[]|any> {
    return this.http.get(this.url + "search" + "?page=" + page + "&username=" + username + "&nameEmployee=" + nameEmployee + "&phone=" + phone);
  }
}
