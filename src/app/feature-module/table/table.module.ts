import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRoutingModule } from './table-routing.module';
import {ShareModule} from '../../share-module/share.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableRoutingModule,
    ShareModule
  ]
})
export class TableModule { }
