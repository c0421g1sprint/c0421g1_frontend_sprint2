import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";
import {IEmployee} from "../../../entity/IEmployee";
import {EmployeeService} from "../../../core-module/employee/employee.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    nameEmployee: new FormControl(""),
    phone: new FormControl(""),
  })
  employees: IEmployee[];
  currentPage: number = 0;
  totalPage: number;
  employee: IEmployee;
  flagSearch: number = 0;

  constructor(private employeeService: EmployeeService,
              private snackbarService: SnackbarService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchAllEmployee(this.currentPage);
  }

  getAllEmployee(page: number) {
    this.employeeService.getAllEmployee(page).subscribe(next=> {
      this.employees = next.content;
      this.totalPage = next.totalPages;
      console.log(next)
    })
  }

  searchAllEmployee(page: number) {
    if (this.searchForm.value.username == "" && this.searchForm.value.nameEmployee == "" && this.searchForm.value.phone == "") {
      this.getAllEmployee(page);
    } else {
      this.flagSearch = 1;
      this.employeeService.search(page, this.searchForm.value.username,
        this.searchForm.value.nameEmployee,this.searchForm.value.phone).subscribe(data=> {
          this.employees = data.content;
          this.totalPage = data.totalPages;
          console.log(data);
          console.log(this.totalPage)
      },error => {
          if (this.employees == null) {
            this.snackbarService.showSnackbar("Không có dữ liệu", "error")
          }
      })
    }
  }

  openDialogDelete(idEmployee: number, nameEmployee: String) {
    let dialog = this.dialog.open(DeleteEmployeeComponent, {
      width: "450px",
      data: {
        id: idEmployee,
        name: nameEmployee,
        object: "người dùng"
      }
    })
    dialog.afterClosed().subscribe(next=> {
      if (next == "true") {
        this.employeeService.deleteEmployee(idEmployee, this.employee).subscribe(data=>{
          console.log(data);
          this.snackbarService.showSnackbar("Xóa thành công " + nameEmployee, "error");
          this.ngOnInit()
        })
      }
    })
  }

  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
    }
    this.searchAllEmployee(this.currentPage);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    } else {
      this.currentPage = 0;
    }
    this.searchAllEmployee(this.currentPage);
  }

  setPage() {
    if (this.flagSearch == 1) {
      this.currentPage = 0;
    }
  }

  toPage(page: number) {
    if (page < this.totalPage && page > 0) {
      this.currentPage = page - 1;
      this.searchAllEmployee(this.currentPage);
    } else {
      this.currentPage = 0;
      this.snackbarService.showSnackbar("Trang bạn nhập vào không có", "error");
    }
  }
}
