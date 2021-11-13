import {IEmployee} from './IEmployee';
import {IOrderDetail} from './IOrderDetail';
import {ITables} from './ITables';

export interface IOrders {
  orderId: number;
  price: number;
  employee: IEmployee;
  orderDetails: IOrderDetail[];
  tables: ITables;
}
