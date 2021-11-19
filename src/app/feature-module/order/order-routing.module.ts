import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from "./order.component";
import {IncomeStatisticsComponent} from "./income-statistics/income-statistics.component";

const routes: Routes = [
  {path: "order", component: OrderComponent, children: [
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
