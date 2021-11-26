import {IOrders} from "./IOrders";
import {IFoodAndDrink} from "./IFoodAndDrink";

export interface IOrderDetail {
  order: IOrders;
  fad: IFoodAndDrink;
  quantity: number;
}
