import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OrderOnServiceComponent} from "./order-on-service/order-on-service.component";
import {OrderComponent} from "./order.component";

const routes: Routes = [
  {path: "order/sale", component: OrderOnServiceComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
