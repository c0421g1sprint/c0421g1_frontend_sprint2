import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TableComponent} from "./table.component";
import {TableListComponent} from "./table-list/table-list.component";
import {CreateTableComponent} from "./create-table/create-table.component";

const routes: Routes = [
  {
    path: "table", component: TableComponent,
    children: [
      {path: "", component: TableListComponent},
      {path: 'create', component: CreateTableComponent},
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TableRoutingModule { }
