import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import {ShareModule} from '../share-module/share.module';
import { EmployeeModule } from './employee/employee.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FoodAndDrinkModule } from './food-and-drink/food-and-drink.module';
import { OrderModule } from './order/order.module';
import { TableModule } from './table/table.module';
import {AccountComponent} from './account/account.component';
import {EmployeeComponent} from './employee/employee.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {FoodAndDrinkComponent} from './food-and-drink/food-and-drink.component';
import {OrderComponent} from './order/order.component';
import {TableComponent} from './table/table.component';
import { CategoryComponent } from './category/category.component';
import { ListComponent } from './category/list/list.component';
import { EditComponent } from './category/edit/edit.component';
import { DeleteComponent } from './category/delete/delete.component';



@NgModule({
  declarations: [CategoryComponent, ListComponent, EditComponent, DeleteComponent],
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
export class FeatureModule { }
