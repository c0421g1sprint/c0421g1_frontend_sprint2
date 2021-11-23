import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodAndDrinkRoutingModule } from './food-and-drink-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ListFoodAndDrinkComponent } from './list-food-and-drink/list-food-and-drink.component';
import {FoodAndDrinkComponent} from "./food-and-drink.component";



@NgModule({
  declarations: [ListFoodAndDrinkComponent,FoodAndDrinkComponent],
  imports: [
    CommonModule,
    FoodAndDrinkRoutingModule,
    ShareModule
  ]
})
export class FoodAndDrinkModule { }
