import {IRole} from './IRole';
import {IEmployee} from './IEmployee';


export interface IAccount {
  accountId: number;
  accountUsername: string;
  accountPassword: string;
  email: string;
  deleteFlag: boolean;
  activeFlag: boolean;
  roles: IRole[];
  employee: IEmployee;
}
