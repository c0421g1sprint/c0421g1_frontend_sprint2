import {Component, OnInit} from '@angular/core';
import {FoodAndDrinkService} from "../../../core-module/food_and_drink/food-and-drink.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {FormControl, FormGroup} from "@angular/forms";
import {finalize} from "rxjs/operators";
import * as url from "url";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-food-and-drink-create',
  templateUrl: './food-and-drink-create.component.html',
  styleUrls: ['./food-and-drink-create.component.css']
})
export class FoodAndDrinkCreateComponent implements OnInit {

  imgSrc: string = '/assets/img/default_placeholder.png';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  showSpinner = false;

  constructor(private foodAndDrinkService: FoodAndDrinkService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<any>,
              private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private snackbarService: SnackbarService) {
  }

  createForm: FormGroup = new FormGroup({
    fadId: new FormControl(''),
    fadName: new FormControl(''),
    fadCode: new FormControl(''),
    fadImage: new FormControl(''),
    fadPrice: new FormControl(''),
    category: new FormControl('')
  })

  ngOnInit(): void {
  }

  createFoodAndDrink(createForm) {
    const value = this.createForm.value;
    console.log(value);
    console.log(createForm);
    if (this.createForm.valid) {
      this.showSpinner = true;
      var filePath = `foodAndDrinkImages/${createForm.value.fadName}_${createForm.value.fadCode}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.createForm.value.fadImage = url;
            console.log(url);
            this.foodAndDrinkService.create(value);
            setTimeout(() => {
              this.showSpinner = false;
              this.dialogRef.close();
              this.snackbarService.showSnackbar('Tạo món mới thành công', 'success')
            });
          });
        })
      ).subscribe();
    } else {
      this.snackbarService.showSnackbar('Biểu mẫu sai, vuilongf nhập chính xác', 'error')
    }
  }

  get formControl() {
    return this.createForm['controls'];
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = './assets/img/img_placeholder1.png';
      this.selectedImage = null;
    }
  }
}
