import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IEmployee} from "../../../entity/IEmployee";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../core-module/employee/employee.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  employee: IEmployee
  name: string;

  constructor( private activatedRouter: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router,
               @Inject(MAT_DIALOG_DATA) public data1: any,
               ) {
    this.employeeService.getUserDetail(data1).subscribe(next => {
      this.employee = next;
    })
  }

  @ViewChild('exampleModal', {static: true}) MyDOMElement: ElementRef;

  ngOnInit(): void {
  }

  //
  // userDetail(id: string) {
  //   let dialog = this.dialog.open(UserDetailComponent,{
  //     maxWidth: '650px',
  //     data: {
  //       id: id
  //     },
  //   });
  //   dialog.afterClosed().subscribe(()=>this.ngOnInit())
  // }
  dataEdit(name: string) {
    this.router.navigateByUrl('/editPass/' + name, {skipLocationChange: true})
    console.log(this.name)
  }
}
