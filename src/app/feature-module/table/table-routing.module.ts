import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TableComponent} from "./table.component";
import {TableListComponent} from "./table-list/table-list.component";

const routes: Routes = [
  {
    path: "table", component: TableComponent,
    children: [
      {path: "", component: TableListComponent},
      // {path: "search", component: StudentSearchComponent},
      // {path: "edit/:id", component: StudentEditComponent},
      // {path: "detail/:id", component: StudentDetailComponent},
      // {path: "mark", component: ListMarkComponent}
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
