import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRoutingModule } from './table-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { CreateTableComponent } from './create-table/create-table.component';



@NgModule({
  declarations: [CreateTableComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    ShareModule
  ]
})
export class TableModule { }
