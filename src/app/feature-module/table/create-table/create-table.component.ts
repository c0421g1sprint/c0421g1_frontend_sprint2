import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TableService} from "../../../core-module/table/table.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {
  public formAddTable: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public tableService: TableService,
    public snackBar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formAddTable = this.formBuilder.group({
      tableCode: ['', [Validators.required, Validators.pattern("^(MB-)\\d{4}$")]],
      location: ['', [Validators.required, Validators.pattern("^(Tang-)\\d{1}$")]],
      maximumCapacity: ['', [Validators.required,Validators.pattern("^\\d{1,20}$")]]
  });
  }

  ngOnInit(): void {
  }

  addWewTable() {
    this.tableService.addWewTables(this.formAddTable.value).subscribe(data => {
      console.log(this.formAddTable.value)
      this.snackBar.showSnackbar('Thêm mới thành công', 'success');
      window.location.reload();
    }, error => {
      this.snackBar.showSnackbar('Thêm mới thất bại tài khoản đã tồn tại', 'error');
    })
  }
}
