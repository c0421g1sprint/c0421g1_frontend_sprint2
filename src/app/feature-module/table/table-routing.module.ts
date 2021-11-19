import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CreateTableComponent} from "./create-table/create-table.component";

import {EditTableComponent} from "./edit-table/edit-table.component";
import {TableComponent} from "./table.component";


const routes: Routes = [
  {path: 'table', component: TableComponent,
    children: [
  {path: 'create', component: CreateTableComponent},
  {path: 'edit/:id', component: EditTableComponent}
]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TableRoutingModule { }
