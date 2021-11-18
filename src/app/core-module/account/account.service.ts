import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {IEditPasswordAccountDto} from "../../entity/iedit-password-account-dto";
import {Observable} from "rxjs";
import {IEmployee} from "../../entity/IEmployee";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {

  }
  // NhatDV function change password
  editPassword(editPasswordAccountDto: IEditPasswordAccountDto):Observable<IEditPasswordAccountDto> {
    console.log(editPasswordAccountDto);
    return this.http.patch<IEditPasswordAccountDto>('/api/account/editPass',editPasswordAccountDto)
  }
//  NhatDV function getUserByName
  getUserByName(userName:any):Observable<Account|any> {
    return this.http.get('/api/account/userName?name='+userName)
  }
}
