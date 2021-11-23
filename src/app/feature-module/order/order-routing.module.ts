import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from "./order.component";
import {OrderListComponent} from "./order-list/order-list.component";

const routes: Routes = [
  {
    path: "order", component: OrderComponent, children: [
      {path: "", component: OrderListComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
