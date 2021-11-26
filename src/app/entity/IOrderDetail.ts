import {IFoodAndDrink} from "./IFoodAndDrink";
import {IOrders} from "./IOrders";

export interface IOrderDetail {
  orderId: IOrders;
  fadId: IFoodAndDrink;
  quantity: number;
}
