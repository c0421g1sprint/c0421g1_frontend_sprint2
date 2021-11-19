import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodAndDrinkRoutingModule } from './food-and-drink-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { FoodAndDrinkCreateComponent } from './food-and-drink-create/food-and-drink-create.component';
import { FoodAndDrinkListComponent } from './food-and-drink-list/food-and-drink-list.component';
import {FoodAndDrinkComponent} from "./food-and-drink.component";
import { FoodAndDrinkUpdateComponent } from './food-and-drink-update/food-and-drink-update.component';



@NgModule({
  declarations: [FoodAndDrinkCreateComponent, FoodAndDrinkListComponent, FoodAndDrinkComponent, FoodAndDrinkUpdateComponent],
  imports: [
    CommonModule,
    FoodAndDrinkRoutingModule,
    ShareModule
  ]
})
export class FoodAndDrinkModule { }
