import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FoodAndDrinkComponent} from "./food-and-drink.component";
import {ListFoodAndDrinkComponent} from "./list-food-and-drink/list-food-and-drink.component";

const routes: Routes = [
  {path: 'food-and-drink', component: FoodAndDrinkComponent,
    children: [
      {path: 'list', component: ListFoodAndDrinkComponent}
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FoodAndDrinkRoutingModule { }
