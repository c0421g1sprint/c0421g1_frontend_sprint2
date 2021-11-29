import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountModule} from './account/account.module';
import {EmployeeModule} from './employee/employee.module';
import {FeedbackModule} from './feedback/feedback.module';
import {FoodAndDrinkModule} from './food-and-drink/food-and-drink.module';
import {OrderModule} from './order/order.module';
import {TableModule} from './table/table.module';
import {HomepageModule} from './homepage-body/homepage.module';
import {CategoryModule} from './category/category.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountModule,
    EmployeeModule,
    FeedbackModule,
    FoodAndDrinkModule,
    OrderModule,
    CategoryModule,
    TableModule,
    HomepageModule,
  ],
  exports: [
    AccountModule,
    EmployeeModule,
    FeedbackModule,
    FoodAndDrinkModule,
    OrderModule,
    TableModule,
    CategoryModule,
    TableModule,
    HomepageModule,
  ]
})
export class FeatureModule { }
