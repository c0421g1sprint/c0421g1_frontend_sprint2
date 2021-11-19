import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountModule} from './account/account.module';
import {ShareModule} from '../share-module/share.module';
import {EmployeeModule} from './employee/employee.module';
import {FeedbackModule} from './feedback/feedback.module';
import {FoodAndDrinkModule} from './food-and-drink/food-and-drink.module';
import {OrderModule} from './order/order.module';
import {TableModule} from './table/table.module';
import {FeedbackComponent} from './feedback/feedback.component';


@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    AccountModule,
    EmployeeModule,
    FeedbackModule,
    FoodAndDrinkModule,
    OrderModule,
    TableModule
  ],
  exports: [
    AccountModule,
    ShareModule,
    EmployeeModule,
    FeedbackModule,
    FoodAndDrinkModule,
    OrderModule,
    TableModule
  ]
})
export class FeatureModule {
}
