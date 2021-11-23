import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IncomeStatisticsComponent} from "./income-statistics/income-statistics.component";
import {OrderComponent} from "./order.component";
import {OrderListComponent} from "./order-list/order-list.component";

const routes: Routes = [
  {
    path: "order", component: OrderComponent, children: [
      {path: "", component: OrderListComponent},
      {path: "income", component: IncomeStatisticsComponent},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
