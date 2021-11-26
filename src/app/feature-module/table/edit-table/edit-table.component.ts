import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITables} from "../../../entity/ITables";
import {TableService} from "../../../core-module/table/table.service";
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  table!: ITables;
  id: number;
  tableForm: FormGroup;

  constructor(private tableService: TableService, private router: Router, private activeRouter: ActivatedRoute, private snackBar: SnackbarService) {
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.tableService.findByIdTable(this.id).subscribe(data=>{
        this.table=data
        this. tableForm = new FormGroup({
          tableId: new FormControl(data.tableId),
          tableCode: new FormControl(data.tableCode,[Validators.required,Validators.pattern("^(TB-)\\d{4}$")]),
          maximumCapacity: new FormControl(data.maximumCapacity,[Validators.required,Validators.pattern("^([0-9]|[0-1][0-9])$")]),
          location: new FormControl(data.location,[Validators.required,Validators.pattern("^(Tầng )\\d{1}$")]),
          tableStatus: new FormControl(data.tableStatus,[Validators.required]),
          availableFlag: new FormControl(data.availableFlag,[Validators.required])
        })
        console.log(this.tableForm.value);
      });
    })
  }


  update(): void {
    if (this.tableForm.valid) {
      const value = this.tableForm.value;
      this.tableService.update(value).subscribe(() => {
        this.snackBar.showSnackbar('Sửa thông tin ban thanh cong', 'success');
        this.router.navigateByUrl("table");
      },error => {this.snackBar.showSnackbar('Biễu mẫu sai, vui lòng nhập lại', 'error')});
    }
  }
}
