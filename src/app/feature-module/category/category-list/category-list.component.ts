import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {CategoryCreateComponent} from "../category-create/category-create.component";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private dialog: MatDialog,
              private router: Router,
              private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
  }

  openDialogCreate() {
    this.dialog.open(CategoryCreateComponent, {panelClass: 'my-bg'});
  }
}
