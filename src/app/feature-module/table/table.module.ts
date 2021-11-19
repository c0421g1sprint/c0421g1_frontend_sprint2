import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRoutingModule } from './table-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { CreateTableComponent } from './create-table/create-table.component';
import {EditTableComponent} from "./edit-table/edit-table.component";



@NgModule({
  declarations: [CreateTableComponent,EditTableComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    ShareModule
  ]
})
export class TableModule { }
