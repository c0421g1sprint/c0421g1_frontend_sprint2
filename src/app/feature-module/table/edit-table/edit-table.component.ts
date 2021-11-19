import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITables} from "../../../entity/ITables";
import {Observable, Subscription} from "rxjs";
import {TableService} from "../../../core-module/table/table.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  table!: ITables;
  id: number;

  public subcription: Subscription | undefined;
  public subcriptionParam: Subscription | undefined;

  tableForm: FormGroup = new FormGroup({
    tableId: new FormControl(''),
    tableCode: new FormControl([Validators.required]),
    maximumCapacity: new FormControl([Validators.required]),
    location: new FormControl([Validators.required]),
    tableStatus: new FormControl([Validators.required]),
    availableFlag: new FormControl([Validators.required])
  });

  constructor(private tableService: TableService, private router: Router, private activeRouter: ActivatedRoute, private snackBar: SnackbarService) {


  }

  ngOnInit(): void {
  }

  loadData() {
    this.subcriptionParam = this.activeRouter.params.subscribe((data: Params) => {
      this.id = data['id'];
      console.log(this.id);
      this.tableService.findByIdTable(this.id).subscribe((tableData: ITables) => {

        this.table = tableData;
        console.log(this.table);
        this.tableForm.patchValue({
          tableId: this.table.tableId,
          tableCode: this.table.tableCode,
          maximumCapacity: this.table.maximumCapacity,
          location: this.table.location,
          tableStatus: this.table.tableStatus,
          availableFlag: this.table.availableFlag,
        });
      });
    });
  }

  update(): void {
    if (this.tableForm.valid) {
      const value = this.tableForm.value;
      this.tableService.update(value).subscribe(() => {
        // this.ngOnInit();
        this.snackBar.showSnackbar('Sửa thông tin ban thanh cong', 'success');
        this.router.navigateByUrl("table/list");
      });
    } else {
      this.snackBar.showSnackbar('Biễu mẫu sai, vui lòng nhập lại', 'success');
    }
  }
}
