import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { MenuComponent } from './menu/menu.component';
import {NgxPaginationModule} from "ngx-pagination";
import {CountdownModule} from "ngx-countdown";
import { DeleteOrderComponent } from './delete-order/delete-order.component';


@NgModule({
  declarations: [MenuComponent, DeleteOrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ShareModule,
    NgxPaginationModule,
    CountdownModule
  ]
})
export class OrderModule { }
