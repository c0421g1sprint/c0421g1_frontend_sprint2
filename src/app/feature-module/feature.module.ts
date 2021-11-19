import {HomepageBodyComponent} from "./homepage-body/homepage-body.component";
import {AccountModule} from "./account/account.module";
import {CommonModule} from "@angular/common";
import {EmployeeModule} from "./employee/employee.module";
import {FeedbackModule} from "./feedback/feedback.module";
import {FoodAndDrinkModule} from "./food-and-drink/food-and-drink.module";
import {OrderModule} from "./order/order.module";
import {TableModule} from "./table/table.module";
import {HomepageModule} from "./homepage-body/homepage.module";
import {ShareModule} from "../share-module/share.module";
import {NgModule} from "@angular/core";


@NgModule({
  declarations: [HomepageBodyComponent],
  imports: [
    CommonModule,
    AccountModule,
    EmployeeModule,
    FeedbackModule,
    FoodAndDrinkModule,
    OrderModule,
    TableModule,
    HomepageModule,
    ShareModule
  ],
  exports: [
    AccountModule,
    // ShareModule,
    EmployeeModule,
    FeedbackModule,
    FoodAndDrinkModule,
    OrderModule,
    TableModule,
    HomepageModule
  ]
})
export class FeatureModule { }
