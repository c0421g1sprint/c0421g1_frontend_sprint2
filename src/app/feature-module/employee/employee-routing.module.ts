import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {EmployeeComponent} from "./employee.component";


const routes: Routes = [
  {
    path: "employee", component: EmployeeComponent,
    children: [
      {
        path: "list", component: ListEmployeeComponent
      }
    ]


}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
