import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { IncomeStatisticsComponent } from './income-statistics/income-statistics.component';
import {OrderComponent} from "./order.component";
import {ChartsModule} from "ng2-charts";



@NgModule({
    declarations: [IncomeStatisticsComponent, OrderComponent],
    exports: [
        IncomeStatisticsComponent
    ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ShareModule,
    ChartsModule
  ]
})
export class OrderModule { }
