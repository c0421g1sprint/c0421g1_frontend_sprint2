import { Component, OnInit } from '@angular/core';
import {IEmployee} from "../../../entity/IEmployee";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EmployeeService} from "../../../core-module/employee/employee.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  employee: IEmployee
  name: string;

  constructor(private activatedRouter: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router,
              private dialog: MatDialog) {
    this.activatedRouter.paramMap.subscribe((paramMap: ParamMap)=> {
      this.name= paramMap.get('name')
            this.employeeService.getUserDetail(name).subscribe(next=>{
              this.employee=next
            })
    })
  }

  ngOnInit(): void {
  }

  userDetail(id: string) {
    let dialog = this.dialog.open(UserDetailComponent,{
      maxWidth: '650px',
      data: {
        id: id
      },
    });
    dialog.afterClosed().subscribe(()=>this.ngOnInit())
  }
}
