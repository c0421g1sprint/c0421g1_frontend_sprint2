import {IOrders} from './IOrders';

export interface ITables {
  tableId: number;
  tableCode: string;
  tableStatus: string;
  location: string;
  maximumCapacity: string;
  onService: number;
  availableFlag: boolean;
  deleteFlag: boolean;
  orders: IOrders[];
}
