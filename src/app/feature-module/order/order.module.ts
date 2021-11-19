import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { OrderOnServiceComponent } from './order-on-service/order-on-service.component';



@NgModule({
  declarations: [OrderOnServiceComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ShareModule
  ]
})
export class OrderModule { }
