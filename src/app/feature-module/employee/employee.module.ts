
import {NgModule} from "@angular/core";
import {EmployeeComponent} from "./employee.component";
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";
import {CommonModule} from "@angular/common";
import {EmployeeRoutingModule} from "./employee-routing.module";
import {ShareModule} from "../../share-module/share.module";
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import {TestSkillMyselfComponent} from "./test-skill-myself/test-skill-myself.component";



@NgModule({
  declarations:[EmployeeComponent,CreateEmployeeComponent, EditEmployeeComponent,TestSkillMyselfComponent],
  imports:[
    CommonModule,
    EmployeeRoutingModule,
    ShareModule,

  ]
})
export class EmployeeModule {

}
