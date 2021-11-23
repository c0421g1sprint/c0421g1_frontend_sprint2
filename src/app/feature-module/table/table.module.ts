import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRoutingModule } from './table-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { CreateTableComponent } from './create-table/create-table.component';
import {EditTableComponent} from "./edit-table/edit-table.component";
import {TableComponent} from "./table.component";
import {ListTableComponent} from "./list-table/list-table.component";



@NgModule({
  declarations: [
    CreateTableComponent,
    EditTableComponent,
    ListTableComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    ShareModule,
  ]
})
export class TableModule { }
