import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodAndDrinkRoutingModule } from './food-and-drink-routing.module';
import {ShareModule} from '../../share-module/share.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FoodAndDrinkRoutingModule,
    ShareModule
  ]
})
export class FoodAndDrinkModule { }
