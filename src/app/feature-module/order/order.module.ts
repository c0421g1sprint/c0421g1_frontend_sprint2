import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { MenuComponent } from './menu/menu.component';
import {NgxPaginationModule} from "ngx-pagination";
import {CountdownModule} from "ngx-countdown";


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ShareModule,
    NgxPaginationModule,
    CountdownModule
  ]
})
export class OrderModule { }
