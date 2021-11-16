import {IEmployee} from './IEmployee';
import {IOrderDetail} from './IOrderDetail';
import {ITables} from './ITables';

export interface IOrders {
  orderId: number;
  orderCode: string;
  createDate: string;
  employee: IEmployee;
  orderDetails: IOrderDetail[];
  tables: ITables;
}
