import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRoutingModule } from './table-routing.module';
import {ShareModule} from '../../share-module/share.module';
import {TableComponent} from "./table.component";
import {TableListComponent} from "./table-list/table-list.component";



@NgModule({
  declarations: [
    TableListComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    ShareModule
  ]
})
export class TableModule { }
