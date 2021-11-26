import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { DialogDeleteComponent } from '../../share-module/delete/dialog-delete.component';
import {EmployeeComponent} from "./employee.component";
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";


@NgModule({
  declarations: [EmployeeComponent,ListEmployeeComponent, DialogDeleteComponent,CreateEmployeeComponent,EditEmployeeComponent,CreateEmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ShareModule,
  ]
})
export class EmployeeModule { }
