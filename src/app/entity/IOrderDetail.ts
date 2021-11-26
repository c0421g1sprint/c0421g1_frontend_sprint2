import {IFoodAndDrink} from "./IFoodAndDrink";
import {IOrders} from "./IOrders";

export interface IOrderDetail {
  orders: IOrders;
  fad: IFoodAndDrink;
  quantity: number;
}
