import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import {EmployeeComponent} from "./employee.component";



@NgModule({
  declarations: [EmployeeComponent,ListEmployeeComponent, DeleteEmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ShareModule,
  ]
})
export class EmployeeModule { }
