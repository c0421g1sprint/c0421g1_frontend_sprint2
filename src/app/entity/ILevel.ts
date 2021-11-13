import {IEmployee} from './IEmployee';

export interface ILevel {
  levelId: number;
  levelName: string;
  employeeSet: IEmployee[];
}
