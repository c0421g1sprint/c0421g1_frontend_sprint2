import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderRoutingModule} from './order-routing.module';
import {ShareModule} from '../../share-module/share.module';
import {MenuComponent} from './menu/menu.component';
import {NgxPaginationModule} from "ngx-pagination";
import {CountdownModule} from "ngx-countdown";
import {DeleteOrderComponent} from './delete-order/delete-order.component';
import {OrderOnServiceComponent} from './order-on-service/order-on-service.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderComponent} from "./order.component";
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {IncomeStatisticsComponent} from './income-statistics/income-statistics.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ChartsModule} from "ng2-charts";


@NgModule({
  declarations: [MenuComponent,
    DeleteOrderComponent,
    OrderComponent,
    OrderListComponent,
    OrderDetailComponent,
    IncomeStatisticsComponent,
    OrderOnServiceComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ShareModule,
    NgxPaginationModule,
    CountdownModule,
    MatGridListModule,
    ChartsModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}}
  ]
})
export class OrderModule {
}
