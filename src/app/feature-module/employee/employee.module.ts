import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import {ShareModule} from '../../share-module/share.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ShareModule
  ]
})
export class EmployeeModule { }
