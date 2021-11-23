import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { IncomeStatisticsComponent } from './income-statistics/income-statistics.component';
import {OrderComponent} from "./order.component";



@NgModule({
    declarations: [IncomeStatisticsComponent, OrderComponent],
    exports: [
        IncomeStatisticsComponent
    ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        ShareModule
    ]
})
export class OrderModule { }
