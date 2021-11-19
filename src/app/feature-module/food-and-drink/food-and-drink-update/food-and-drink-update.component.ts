import {Component, OnInit} from '@angular/core';
import {IFoodAndDrink} from "../../../entity/IFoodAndDrink";
import {FormControl, FormGroup} from "@angular/forms";
import {ICategory} from "../../../entity/ICategory";
import {FoodAndDrinkService} from "../../../core-module/food_and_drink/food-and-drink.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";

@Component({
  selector: 'app-food-and-drink-update',
  templateUrl: './food-and-drink-update.component.html',
  styleUrls: ['./food-and-drink-update.component.css']
})
export class FoodAndDrinkUpdateComponent implements OnInit {

  foodAndDrink: IFoodAndDrink;
  categoryList: ICategory[];
  showSpinner = false;

  editForm = new FormGroup({
    fadId: new FormControl(''),
    fadName: new FormControl(''),
    fadCode: new FormControl(''),
    fadImage: new FormControl(''),
    fadPrice: new FormControl(''),
    category: new FormControl('')
  })

  constructor(private foodAndDrinkService: FoodAndDrinkService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<any>,
              private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private snackbarService: SnackbarService) {
  }

  getFoodAndDrink(index: number){

  }

  ngOnInit(): void {
  }

}
