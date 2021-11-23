import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {DialogDeleteComponent} from "../../../share-module/delete/dialog-delete.component";
import {IEmployee} from "../../../entity/IEmployee";
import {EmployeeService} from "../../../core-module/employee/employee.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {registerLocaleData } from "@angular/common";
import localeVn from "@angular/common/locales/vi"
registerLocaleData(localeVn,'vi')

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    nameEmployee: new FormControl(""),
    phone: new FormControl("",[Validators.pattern("^[0-9]*$")]),
  })
  employees: IEmployee[];
  currentPage: number = 0;
  totalPage: number;
  employee: IEmployee;
  flagSearch: number = 0;

  constructor(private employeeService: EmployeeService,
              private snackbarService: SnackbarService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.searchAllEmployee(this.currentPage);
  }



  searchAllEmployee(page: number) {
      this.flagSearch = 1;
      this.employeeService.search(page, this.searchForm.value.username,
        this.searchForm.value.nameEmployee, this.searchForm.value.phone).subscribe(data => {
        this.employees = data.content;
        this.totalPage = data.totalPages;
        console.log(data);
        console.log(this.totalPage)
      }, error => {
        if (error.status == '404') {
          this.snackbarService.showSnackbar("Không tìm thấy dữ liệu", "error");
        }
      })


  }

  openDialogDelete(idEmployee: number, nameEmployee: String) {
    let dialog = this.dialog.open(DialogDeleteComponent, {
      width: "450px",
      data: {
        id: idEmployee,
        name: nameEmployee,
        object: "người dùng"
      }
    });
    dialog.afterClosed().subscribe(next => {
      if (next == "yes") {
        this.employeeService.deleteEmployee(idEmployee, this.employee).subscribe(data => {
          console.log(data);
          this.snackbarService.showSnackbar("Xóa thành công " + nameEmployee, "success");
          this.ngOnInit()
        })
      }
    })
  }

  nextPage() {
    if (this.searchForm.value.username != "") {
      this.searchForm.value.username = "";
    }
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
      this.searchAllEmployee(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.searchAllEmployee(this.currentPage);
    } else {
      this.currentPage = 0;
    }
  }

  setPage() {
    if (this.flagSearch == 1) {
      this.currentPage = 0;
    }
  }

  toPage(inputPage: string) {
    if (Number(inputPage) <= this.totalPage && Number(inputPage) > 0) {
      this.currentPage = Number(inputPage) - 1;
      this.searchAllEmployee(this.currentPage);
    } else {
      this.currentPage = 0;
      this.snackbarService.showSnackbar("Trang bạn nhập vào không có", "error");
    }
  }

  validateMsg = {
    phone: [
      {
        type: "pattern", message: "Chỉ nhập số"
      }
    ]
  }

}
