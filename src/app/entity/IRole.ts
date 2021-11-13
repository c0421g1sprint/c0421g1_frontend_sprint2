import {IAccount} from './IAccount';

export interface IRole {
  roleId: number;
  roleName: string;
  accounts: IAccount[];
}
