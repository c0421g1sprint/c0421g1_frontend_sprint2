import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FoodAndDrinkComponent} from "./food-and-drink.component";
import {FoodAndDrinkListComponent} from "./food-and-drink-list/food-and-drink-list.component";
import {FoodAndDrinkUpdateComponent} from "./food-and-drink-update/food-and-drink-update.component";

const routes: Routes = [
  {
    path: "food-and-drink", component: FoodAndDrinkComponent,
    children: [
      {path: "list", component: FoodAndDrinkListComponent},
      {path: "update/:id", component: FoodAndDrinkUpdateComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FoodAndDrinkRoutingModule {
}
