import { Component, OnInit } from '@angular/core';
import {IEmployee} from "../../../entity/IEmployee";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EmployeeService} from "../../../core-module/employee/employee.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  employee: IEmployee
  name: string;
  acc
  constructor(private activatedRouter: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router) {
    this.activatedRouter.paramMap.subscribe((paramMap: ParamMap)=> {
      this.name= paramMap.get('name')
            this.employeeService.getUserDetail(name).subscribe(next=>{
              this.employee=next
            })
    })
  }

  ngOnInit(): void {
  }

}
