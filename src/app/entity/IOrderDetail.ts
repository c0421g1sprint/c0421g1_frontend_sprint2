import {IFoodAndDrink} from "./IFoodAndDrink";

export interface IOrderDetail {
  orderId: IOrderDetail;
  fadId: IFoodAndDrink;
  quantity: number;
}
