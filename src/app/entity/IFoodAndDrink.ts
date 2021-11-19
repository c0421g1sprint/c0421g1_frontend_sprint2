import {ICategory} from './ICategory';
import {IOrderDetail} from './IOrderDetail';

export interface IFoodAndDrink {
  fadId: number;
  fadName: string;
  fadImage: string;
  fadCode: string;
  fadPrice: number;
  fadWaitTime: number;
  deleteFlag: boolean;
  category: ICategory;
  orderDetails: IOrderDetail[];


}
