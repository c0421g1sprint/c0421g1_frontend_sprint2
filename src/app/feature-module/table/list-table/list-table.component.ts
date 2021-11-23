import { Component, OnInit } from '@angular/core';
import {CreateTableComponent} from "../create-table/create-table.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialogCreate() {
     this.dialog.open(CreateTableComponent, {
      width: '550px'
    })
  }
}
