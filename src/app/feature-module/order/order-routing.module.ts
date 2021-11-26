import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IncomeStatisticsComponent} from "./income-statistics/income-statistics.component";
import {OrderComponent} from "./order.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderOnServiceComponent} from "./order-on-service/order-on-service.component";
import {MenuComponent} from "./menu/menu.component";

const routes: Routes = [
  {
    path: "order", component: OrderComponent, children: [
      {path: "", component: OrderListComponent},
      {path: "income", component: IncomeStatisticsComponent},
      {path: "sale", component: OrderOnServiceComponent},
      {path: "menu", component: MenuComponent}

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
