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
  private urlFood = "http://localhost:8080/api/order/call-food";
  private urlEmp = "http://localhost:8080/api/order/call-employee";
  private urlPay = "http://localhost:8080/api/order/call-pay";
  private urlNewOrder = "http://localhost:8080/api/order/create/orderTable";
  private getNewOrder = "http://localhost:8080/api/order/list/orderNew";
  private urlCreateOrderDetail = "http://localhost:8080/api/order/create/orderDetail";
  private urlFindOrderDetail = "http://localhost:8080/api/order/orderDetail";
  private deleteOrderDetail = "http://localhost:8080/api/order/delete/orderDetail";

  constructor(private http: HttpClient) {

  }


  callFood(table: ITables, id: number): Observable<ITables | any> {
    return this.http.patch(this.urlFood + "/" + id, table);
  }

  callEmp(table: ITables, id: number): Observable<ITables | any> {
    return this.http.patch(this.urlEmp + "/" + id, table);
  }

  callPay(table: ITables, id: number): Observable<ITables | any> {
    return this.http.patch(this.urlPay + "/" + id, table);
  }

  createNewOrder(order: IOrders): Observable<IOrders | any> {   // tao trc 1 thang order voi 1 table
    return this.http.post(this.urlNewOrder, order);
  }

  getOrder(): Observable<IOrders | any> {   // lay ra thang order moi nhat
    return this.http.get(this.getNewOrder);
  }

  createNewOrderDetail(orderDetail: IOrderDetail): Observable<IOrderDetail | any> {
    return this.http.post(this.urlCreateOrderDetail, orderDetail);
  }

  findByIdOrderDetail(id: number): Observable<IOrderDetail | any> {
    return this.http.get(this.urlFindOrderDetail + "/" + id);
  }

  deleteOrderDetailById(id: number): Observable<IOrderDetail | any> {
    return this.http.delete(this.deleteOrderDetail + "/" + id);
  }

}
