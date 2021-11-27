import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {IEmployee} from "../../entity/IEmployee";
import {StorageService} from "../account/storage.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private httpOptions;
  constructor(private http: HttpClient, private storageService: StorageService) {
    this.httpOptions ={
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'DUNG ' + `${this.storageService.getToken()}`}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }

  // xem thông tin user by Nhật
  getUserDetail(userDetail: any): Observable<IEmployee | any> {
    return this.http.get('http://localhost:8080/api/employee/userDetail?name=' + userDetail, this.httpOptions)
  }

  //PhucNK
  private urlFindEmployeeById = 'http://localhost:8080/api/employee';
  private urlCreateEmployee = 'http://localhost:8080/api/employee/createEmployee';
  private urlEditEmployee = 'http://localhost:8080/api/employee/updateEmployee';


  //MinhNN
  getAllEmployee(page: number): Observable<IEmployee[] | any> {
    return this.http.get(this.urlFindEmployeeById + "/list" + "?page=" + page, this.httpOptions);
  }


  //MinhNN
  deleteEmployee(id: number, iEmployee: IEmployee): Observable<IEmployee | any> {
    return this.http.patch(this.urlFindEmployeeById + "/delete/" + id, iEmployee, this.httpOptions);
  }

  //MinhNN
  search(page: number, username: String, nameEmployee: String, phone: String): Observable<IEmployee[] | any> {
    return this.http.get(this.urlFindEmployeeById + "/search" + "?page=" + page + "&username=" + username + "&nameEmployee=" + nameEmployee + "&phone=" + phone, this.httpOptions);
  }


  // find theo Id PhucNK
  findByIdEmployee(id: number): Observable<IEmployee | any> {
    return this.http.get(this.urlFindEmployeeById + '/' + id, this.httpOptions);
  }


  // them  PhucNK
  saveEmployee(employee: IEmployee): Observable<IEmployee | any> {
    return this.http.post(this.urlCreateEmployee, employee, this.httpOptions);
  }

  // update  PhucNK
  updateEmployee(employee: IEmployee): Observable<IEmployee | any> {
    return this.http.patch(this.urlEditEmployee, employee, this.httpOptions);
  }

}
