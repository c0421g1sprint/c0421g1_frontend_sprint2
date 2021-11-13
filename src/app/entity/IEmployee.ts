import {ILevel} from './ILevel';
import {IAccount} from './IAccount';
import {IOrders} from './IOrders';

export interface IEmployee {
  employeeId: number;
  employeeName: string;
  employeeAddress: string;
  employeePhone: string;
  employeeImage: string;
  employeeGender:number;
  employeeBirthday: string;
  employeeSalary: number;
  deleteFlag: boolean;
  level: ILevel;
  account: IAccount;
  ordersSet: IOrders[];
}
