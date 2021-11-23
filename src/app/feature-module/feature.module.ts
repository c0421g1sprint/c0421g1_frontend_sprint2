import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountModule} from './account/account.module';
import {ShareModule} from '../share-module/share.module';
import {EmployeeModule} from './employee/employee.module';
import {FeedbackModule} from './feedback/feedback.module';
import {OrderModule} from './order/order.module';
import {TableModule} from './table/table.module';
import {CategoryModule} from './category/category.module';
import {FoodAndDrinkModule} from "./food-and-drink/food-and-drink.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountModule,
    EmployeeModule,
    FeedbackModule,
    FoodAndDrinkModule,
    OrderModule,
    TableModule,
    CategoryModule
  ],
  exports: [
    AccountModule,
    ShareModule,
    EmployeeModule,
    FeedbackModule,
    FoodAndDrinkModule,
    OrderModule,
    TableModule,
    CategoryModule
  ]
})
export class FeatureModule {
}
