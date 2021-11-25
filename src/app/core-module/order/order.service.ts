import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITables} from "../../entity/ITables";
import {Observable} from "rxjs";
import {IOrders} from "../../entity/IOrders";
import {IOrderDetail} from "../../entity/IOrderDetail";


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

  constructor(private http: HttpClient) {

  }


  callFood(table: ITables, id: number): Observable<ITables | any> { //BaoHG
    return this.http.patch(this.urlFood + "/" + id, table);
  }

  callEmp(table: ITables, id: number): Observable<ITables | any> { //BaoHG
    return this.http.patch(this.urlEmp + "/" + id, table);
  }

  callPay(table: ITables, id: number): Observable<ITables | any> { //BaoHG
    return this.http.patch(this.urlPay + "/" + id, table);
  }

  createNewOrder(order: IOrders): Observable<IOrders | any> {   //BaoHG // tao trc 1 thang order voi 1 table
    return this.http.post(this.urlNewOrder, order);
  }

  getOrder(): Observable<IOrders | any> {  //BaoHG  // lay ra thang order moi nhat
    return this.http.get(this.getNewOrder);
  }

  createNewOrderDetail(orderDetail: IOrderDetail): Observable<IOrderDetail | any> { //BaoHG
    return this.http.post(this.urlCreateOrderDetail, orderDetail);
  }

  findByIdOrderDetail(id: number): Observable<IOrderDetail | any> { //BaoHG
    return this.http.get(this.urlFindOrderDetail + "/" + id);
  }

  deleteOrderDetailById(id: number): Observable<IOrderDetail | any> {//BaoHG
    return this.http.delete(this.deleteOrderDetail + "/" + id);
  }

}
