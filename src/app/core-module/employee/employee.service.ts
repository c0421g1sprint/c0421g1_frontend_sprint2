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
  getUserDetail(userDetail: any): Observable<IEmployee | any> {
    return this.http.get('http://localhost:8080/api/employee/userDetail?name=' + userDetail)
  }

  //PhucNK
  private urlFindEmployeeById = 'http://localhost:8080/api/employee';
  private urlCreateEmployee = 'http://localhost:8080/api/employee/createEmployee';
  private urlEditEmployee = 'http://localhost:8080/api/employee/updateEmployee';


  //MinhNN
  getAllEmployee(page: number): Observable<IEmployee[] | any> {
    return this.http.get(this.urlFindEmployeeById + "/list" + "?page=" + page);
  }


  //MinhNN
  deleteEmployee(id: number, iEmployee: IEmployee): Observable<IEmployee | any> {
    return this.http.patch(this.urlFindEmployeeById + "/delete/" + id, iEmployee);
  }

  //MinhNN
  search(page: number, username: String, nameEmployee: String, phone: String): Observable<IEmployee[] | any> {
    return this.http.get(this.urlFindEmployeeById + "/search" + "?page=" + page + "&username=" + username + "&nameEmployee=" + nameEmployee + "&phone=" + phone);
  }


  // find theo Id PhucNK
  findByIdEmployee(id: number): Observable<IEmployee | any> {
    return this.http.get(this.urlFindEmployeeById + '/' + id);
  }


  // them  PhucNK
  saveEmployee(employee: IEmployee): Observable<IEmployee | any> {
    return this.http.post(this.urlCreateEmployee, employee);
  }

  // update  PhucNK
  updateEmployee(employee: IEmployee): Observable<IEmployee | any> {
    return this.http.patch(this.urlEditEmployee, employee);
  }

}
