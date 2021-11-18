import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodAndDrinkRoutingModule } from './food-and-drink-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { FoodAndDrinkCreateComponent } from './food-and-drink-create/food-and-drink-create.component';
import { FoodAndDrinkListComponent } from './food-and-drink-list/food-and-drink-list.component';



@NgModule({
  declarations: [FoodAndDrinkCreateComponent, FoodAndDrinkListComponent],
  imports: [
    CommonModule,
    FoodAndDrinkRoutingModule,
    ShareModule
  ]
})
export class FoodAndDrinkModule { }
