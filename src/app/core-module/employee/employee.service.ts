import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IEmployee} from "../../entity/IEmployee";
import {ILevel} from "../../entity/ILevel";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private urlFindEmployeeById='http://localhost:8080/api/employee'
  private urlCreateEmployee='http://localhost:8080/api/employee/createEmployee'
  private urlEditEmployee='http://localhost:8080/api/employee/updateEmployee'

  constructor(private http: HttpClient) {
  }

  // find theo Id PhucNK
  findByIdEmployee(id: number): Observable<IEmployee| any> {
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

//  thêm tối nay
  private urlListAccount='http://localhost:8080/api/employee/listAccountName'
  listAccount():Observable<String[] | any>{
    return this.http.get<String[]>(this.urlListAccount);
  }

  // findAllLevel(): Observable<ILevel[]>{
  //   return this.http.get<ILevel[]>(this.urlGetLevelList);
  // }
}
