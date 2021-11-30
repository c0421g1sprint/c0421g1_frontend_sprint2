import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {IOrders} from "../../entity/IOrders";
import {ITables} from "../../entity/ITables";
import {StorageService} from "../account/storage.service";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private orderUrlApi = 'http://localhost:8080/api/order/on-service';
  private orderUrlApi2 = 'http://localhost:8080/api/order/on-service/handle';
  httpOptions: any;

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'DUNG ' + `${this.storageService.getToken()}`
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }

  findOrderById(id: number): Observable<any> {
    return this.httpClient.get<IOrders>(this.orderUrlApi + '/' + id, this.httpOptions).pipe();
  }

  showTableOnService(page: number): Observable<ITables | any> {
    return this.httpClient.get<ITables>(this.orderUrlApi + '?page=' + page, this.httpOptions);
  }

  changeTableOnServiceStatus(id: number): Observable<any> {
    return this.httpClient.patch<ITables>(this.orderUrlApi2 + '/' + id, this.httpOptions);
  }

  resetTableStatus(id: number): Observable<any> {
    return this.httpClient.patch<ITables>(this.orderUrlApi + '/reset/' + id, this.httpOptions).pipe();
  }

  showOrderDetailSum(id: number): Observable<any> {
    return this.httpClient.get<Number>(this.orderUrlApi + '/sum-' + id, this.httpOptions).pipe();
  }

  updateOrder(id: number): Observable<any> {
    return this.httpClient.patch(this.orderUrlApi + '/update/' + id, this.httpOptions).pipe();
  }
}
