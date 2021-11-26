import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {EmployeeComponent} from "./employee.component";
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";

const routes: Routes = [
  {
    path: "employee", component: EmployeeComponent,
    children: [
      {path: "list", component: ListEmployeeComponent},
      {path: 'createEmployee', component: CreateEmployeeComponent},
      {path: 'updateEmployee/:id', component: EditEmployeeComponent},
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
