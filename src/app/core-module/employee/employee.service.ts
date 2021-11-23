import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IEmployee} from "../../entity/IEmployee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = "http://localhost:8080/api/employee/"

  constructor(private http: HttpClient) { }

  getAllEmployee(page: number): Observable<IEmployee[] | any> {
    return this.http.get(this.url + "list" + "?page=" + page);
  }

  findById(id: number): Observable<IEmployee | any> {
    return this.http.get(this.url + id);
  }

  deleteEmployee(id: number, iEmployee: IEmployee): Observable<IEmployee|any> {
    return this.http.patch(this.url + "delete/" + id, iEmployee);
  }

  search(page: number, username: String, nameEmployee: String, phone: String): Observable<IEmployee[]|any> {
    return this.http.get(this.url + "search" + "?page=" + page + "&username=" + username + "&nameEmployee=" + nameEmployee + "&phone=" + phone);
  }
}
