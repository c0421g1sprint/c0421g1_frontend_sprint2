import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { OrderListComponent } from './order-list/order-list.component';
import {OrderComponent} from "./order.component";
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { IncomeStatisticsComponent } from './income-statistics/income-statistics.component';



@NgModule({
  declarations: [OrderComponent,OrderListComponent, OrderDetailComponent,IncomeStatisticsComponent],
    imports: [
        CommonModule,
        OrderRoutingModule,
        ShareModule,
        MatGridListModule,
    ]
})
export class OrderModule { }
