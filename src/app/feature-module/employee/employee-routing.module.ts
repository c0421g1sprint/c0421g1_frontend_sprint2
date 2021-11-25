import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from "./employee.component";
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";
import {TestSkillMyselfComponent} from "./test-skill-myself/test-skill-myself.component";


const routes: Routes = [

  {path: 'employee', component: EmployeeComponent,
    children: [
      //Phuc router
      {path: 'createEmployee', component: CreateEmployeeComponent},
      {path: 'updateEmployee/:id', component: EditEmployeeComponent},
      {path:'testEmployee',component:TestSkillMyselfComponent},

    ]},


];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
