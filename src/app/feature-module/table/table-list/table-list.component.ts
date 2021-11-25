import { Component, OnInit } from '@angular/core';
import {TableService} from "../../../core-module/table/table.service";
import {ITables} from "../../../entity/ITables";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogDeleteComponent} from "../../../share-module/dialog-delete/dialog-delete.component";
import {CreateTableComponent} from "../create-table/create-table.component";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  //HauPT do at 21/11/2021
  tableList: ITables[];
  currentPage: number = 0;
  totalPage: number = 0;
  searchForm: FormGroup = new FormGroup(
    {
      tableCode: new FormControl(),
      tableStatus: new FormControl()
    }
  );
  tableCode: string = '';
  tableStatus: string = '';

  constructor(private tableService: TableService,
              private snackBar: SnackbarService,
              private matDialog: MatDialog,
              private router: Router) {}

  ngOnInit(): void {
    //HauPT do at 21/11/2021
    this.currentPage = 0;
    this.totalPage = 0;
    this.tableStatus = '';
    this.tableCode = '';
   this.getTableList(this.currentPage);
  }

  //HauPT do table page at 21/11/2021
  getTableList(currentPage: number) {
    this.tableService.getListTables(currentPage).subscribe(list => {
      this.tableList = list.content;
      this.totalPage = list.totalPages;
    });
  }

  //HauPT do pagination at  21/11/2021
  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
      if (this.tableCode == '' && this.tableStatus == ''){
        this.getTableList(this.currentPage);
      } else {
        this.getSearch();
      }
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      if (this.tableCode == '' && this.tableStatus == ''){
        this.getTableList(this.currentPage);
      } else {
        this.getSearch();
      }
    }
  }

  forwardTo(inputPage: number) {
    if (Number(inputPage) <= this.totalPage && Number(inputPage) > 0) {
      this.currentPage = inputPage - 1;
      if (this.tableCode == '' && this.tableStatus == ''){
        this.getTableList(this.currentPage);
      } else {
        this.getSearch();
      }
    } else {
      this.currentPage = 0;
      if (this.tableCode == '' && this.tableStatus == ''){
        this.getTableList(this.currentPage);
      } else {
        this.getSearch();
      }
      this.snackBar.showSnackbar("Trang bạn nhập vào không có","error");
    }
  }

  // HauPT do search table at 21/11/2021
  getSearch() {
    this.tableCode = this.tableCode.trim();
    this.tableService.searchTables(this.currentPage , this.tableCode, this.tableStatus ).subscribe(data => {
      this.tableList = data.content;
      this.totalPage = data.totalPages;
    }, error => {
      this.currentPage = 0;
      this.getTableList(this.currentPage);
      this.snackBar.showSnackbar('Bàn bạn cần tìm không tồn tại', "error")
    });
  }

  //HauPT do delete table at 23/11/2021
  deleteTable(tableId: number){
    this.tableService.deleteTables(tableId).subscribe(next => {
      this.ngOnInit();
      this.snackBar.showSnackbar("Xoá thành công!!", "success");
    }, error => {
      this.snackBar.showSnackbar("Không tồn tại dữ liệu bàn", "error");
    })
  }

  getDelete(tableId: number, tableCode: string) {
    let dialogRef = this.matDialog.open(DialogDeleteComponent, {
      data: {
        id: tableId,
        name: tableCode,
        object: "table"
      },
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(next => {
      if (next == 'yes') {
        this.deleteTable(tableId);
      }
    })
  }

  openDialogCreate() {
    this.matDialog.open(CreateTableComponent, {
      width: '550px'
    })
  }

  editTable(tableId: number) {
    this.router.navigate(['table/edit/' + tableId])
  }
}
