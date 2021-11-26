import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {DialogDeleteComponent} from "../../../share-module/delete/dialog-delete.component";
import {IEmployee} from "../../../entity/IEmployee";
import {EmployeeService} from "../../../core-module/employee/employee.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {registerLocaleData } from "@angular/common";
import localeVn from "@angular/common/locales/vi"
// import {CreateEmployeeComponent} from "../create-employee/create-employee.component";
registerLocaleData(localeVn,'vi')

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.maxLength(100)]),
    nameEmployee: new FormControl("",[Validators.maxLength(100)]),
    phone: new FormControl("",[Validators.pattern("^[0-9]*$"),Validators.maxLength(11)])
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
    if (this.searchForm.valid) {
      this.flagSearch = 1;
      this.employeeService.search(page, this.searchForm.value.username.trim(),
        this.searchForm.value.nameEmployee.trim(), this.searchForm.value.phone.trim()).subscribe(data => {
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
          this.employeeService.getAllEmployee(this.currentPage).subscribe(list => {
            this.employees = list.content
            this.totalPage = list.totalPages;
          })
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

  // openDialogCreate() {
  //   this.dialog.open(CreateEmployeeComponent,{
  //     width:'1200px',
  //     autoFocus:false,
  //     maxHeight:'100vh'
  //   });
  // }

  validateMsg = {
    phone: [
      {
        type: "pattern", message: "Chỉ nhập số"
      },
      {
        type: "maxlength", message: "Không được nhập quá 12 số"
      }
    ],
    username: [
      {
        type: "maxlength", message: "Không được nhập quá 100 kí tự"
      }
    ],
    nameEmployee: [
      {
        type: "maxlength", message: "Không được nhập quá 100 kí tự"
      }
    ]
  }

}
