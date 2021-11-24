import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import {ShareModule} from '../share-module/share.module';
import { EmployeeModule } from './employee/employee.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FoodAndDrinkModule } from './food-and-drink/food-and-drink.module';
import { OrderModule } from './order/order.module';
import { CartComponent } from './cart/cart.component';
import {CountdownModule} from "ngx-countdown";


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    AccountModule,
    EmployeeModule,
    FeedbackModule,
    FoodAndDrinkModule,
    OrderModule,


  ],
  exports: [
    AccountModule,
    ShareModule,
    EmployeeModule,
    FeedbackModule,
    FoodAndDrinkModule,
    OrderModule,
  ]
})
export class FeatureModule { }
