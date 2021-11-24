import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateEmployeeComponent} from "../create-employee/create-employee.component";

@Component({
  selector: 'app-test-skill-myself',
  templateUrl: './test-skill-myself.component.html',
  styleUrls: ['./test-skill-myself.component.css']
})
export class TestSkillMyselfComponent implements OnInit {

  constructor( private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogCreate() {
    let dialogRef = this.dialog.open(CreateEmployeeComponent,{
      width:'1200px',
      autoFocus:false,
      maxHeight:'100vh'

    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

}
