import {IFoodAndDrink} from './IFoodAndDrink';

export interface ICategory {
  categoryId: number;
  categoryName: string;
  categoryCode: string;
  foodAndDrink: IFoodAndDrink[];
}
