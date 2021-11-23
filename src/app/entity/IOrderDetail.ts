import {IOrders} from "./IOrders";
import {IFoodAndDrink} from "./IFoodAndDrink";

export interface IOrderDetail {
  orderId: IOrders;
  fadId: IFoodAndDrink;
  quantity: number;
}
