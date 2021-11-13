import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import {ShareModule} from '../../share-module/share.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ShareModule
  ]
})
export class OrderModule { }
