import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {IEditPasswordAccountDto} from "../../entity/iedit-password-account-dto";
import {Observable} from "rxjs";
import {IEmployee} from "../../entity/IEmployee";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountURL = 'http://localhost:8080/api/account/'
  private httpOptions;

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.httpOptions ={
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'DUNG ' + `${this.storageService.getToken()}`}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }

  //NhatDV function change password
  editPassword(editPasswordAccountDto: IEditPasswordAccountDto): Observable<any> {
    console.log(editPasswordAccountDto);
    return this.http.patch<IEditPasswordAccountDto>(this.accountURL + 'editPass', editPasswordAccountDto, this.httpOptions).pipe();
  }

  //NhatDV function getUserByName
  getUserByName(userName: any): Observable<Account | any> {
    console.log(userName)
    return this.http.get(this.accountURL + 'userName?name=' + userName, this.httpOptions)
  }
}
