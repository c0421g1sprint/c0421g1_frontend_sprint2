import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {IOrders} from "../../entity/IOrders";
import {IOrderDetail} from "../../entity/IOrderDetail";
import {ITables} from "../../entity/ITables";
import {StorageService} from "../account/storage.service";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private urlFood = "http://localhost:8080/api/order/call-food"; //BaoHG
  private urlEmp = "http://localhost:8080/api/order/call-employee"; //BaoHG
  private urlPay = "http://localhost:8080/api/order/call-pay"; //BaoHG
  private urlNewOrder = "http://localhost:8080/api/order/create/orderTable"; //BaoHG
  private getNewOrder = "http://localhost:8080/api/order/list/orderNew"; //BaoHG
  private urlCreateOrderDetail = "http://localhost:8080/api/order/create/orderDetail"; //BaoHG
  private urlFindOrderDetail = "http://localhost:8080/api/order/orderDetail"; //BaoHG
  private deleteOrderDetail = "http://localhost:8080/api/order/delete/orderDetail"; //BaoHG
  private api_url = "http://localhost:8080/api/order";

  private httpOptions;

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'DUNG ' + `${this.storageService.getToken()}`
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }


  callFood(table: ITables, id: number): Observable<ITables | any> { //BaoHG
    return this.http.patch(this.urlFood + "/" + id, table, this.httpOptions);
  }

  callEmp(table: ITables, id: number): Observable<ITables | any> { //BaoHG
    return this.http.patch(this.urlEmp + "/" + id, table, this.httpOptions);
  }

  callPay(table: ITables, id: number): Observable<ITables | any> { //BaoHG
    return this.http.patch(this.urlPay + "/" + id, table, this.httpOptions);
  }

  createNewOrder(order: IOrders): Observable<IOrders | any> {   //BaoHG // tao trc 1 thang order voi 1 table
    return this.http.post(this.urlNewOrder, order, this.httpOptions);
  }

  getOrder(): Observable<IOrders | any> {  //BaoHG  // lay ra thang order moi nhat
    return this.http.get(this.getNewOrder, this.httpOptions);
  }

  createNewOrderDetail(orderDetail: IOrderDetail): Observable<IOrderDetail | any> { //BaoHG
    return this.http.post(this.urlCreateOrderDetail, orderDetail, this.httpOptions);
  }

  findByIdOrderDetail(id: number): Observable<IOrderDetail | any> { //BaoHG
    return this.http.get(this.urlFindOrderDetail + "/" + id, this.httpOptions);
  }

  deleteOrderDetailById(id: number): Observable<IOrderDetail | any> {//BaoHG
    return this.http.delete(this.deleteOrderDetail + "/" + id, this.httpOptions);
  }

  //TaiNP
  getIncomeWithDate(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(this.api_url + "/income-date" + "?startDate=" + startDate + "&endDate=" + endDate, this.httpOptions);
  }

  //TaiNP
  getStatisticsIncome(): Observable<any> {
    return this.http.get<any>(this.api_url + "/income-statistics", this.httpOptions);
  }

  //DanhNT
  showBillList(orderCode: string, createDate: string, page: number): Observable<IOrders[] | any> {
    return this.http.get(this.api_url + "/list/" + orderCode + "/" + createDate + "?page=" + page, this.httpOptions);
  }
}
