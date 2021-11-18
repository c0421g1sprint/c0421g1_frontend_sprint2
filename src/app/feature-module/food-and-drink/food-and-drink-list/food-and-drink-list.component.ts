import {Component, OnInit} from '@angular/core';
import {FoodAndDrinkService} from "../../../core-module/food_and_drink/food-and-drink.service";
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {FoodAndDrinkCreateComponent} from "../food-and-drink-create/food-and-drink-create.component";

@Component({
  selector: 'app-food-and-drink-list',
  templateUrl: './food-and-drink-list.component.html',
  styleUrls: ['./food-and-drink-list.component.css']
})
export class FoodAndDrinkListComponent implements OnInit {

  constructor(private foodAndDrinkService: FoodAndDrinkService,
              private categoryService: CategoryService,
              private dialog: MatDialog,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
  }

  openDialogCreate(){
    this.dialog.open(FoodAndDrinkCreateComponent)
  }
}
