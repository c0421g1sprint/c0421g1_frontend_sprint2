import {Component, OnInit} from '@angular/core';
import {FoodAndDrinkService} from "../../../core-module/food_and_drink/food-and-drink.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {MatDialogRef} from "@angular/material/dialog";
import {ICategory} from "../../../entity/ICategory";

@Component({
  selector: 'app-food-and-drink-create',
  templateUrl: './food-and-drink-create.component.html',
  styleUrls: ['./food-and-drink-create.component.css']
})
export class FoodAndDrinkCreateComponent implements OnInit {

  imgSrc: string = '/assets/img/default-placeholder.png';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  showSpinner = false;
  categoryList: ICategory[];

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
    fadName: new FormControl('', [Validators.required,
      Validators.minLength(5), Validators.maxLength(50),
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]*$/),
      this.customPatternValid({
        pattern: /^\s?\S+(?: \S+)*\s?$/, msg: 'Không thể nhập nhiều khoảng trắng.'
      })]),
    fadCode: new FormControl('', [Validators.required,
      Validators.minLength(3), Validators.maxLength(10),
      this.noWhitespaceValidator]),
    fadImage: new FormControl('', [Validators.required]),
    fadPrice: new FormControl('', [Validators.required,
      Validators.pattern(/^[0-9]*$/),
      this.customPatternValid({
        pattern: /^\s?\S+(?: \S+)*\s?$/, msg: 'Không thể nhập nhiều khoảng trắng.'
      }),
      this.noWhitespaceValidator]),
    category: new FormControl(' ', Validators.required)
  })

  validationMessage = {
    fadName: [
      {type: 'required', message: 'Món không được để trống.'},
      {type: 'pattern', message: 'Món không được chứa ký tự đặc biệt và số.'}
    ],
    fadCode: [
      {type: 'required', message: 'Món không được để trống.'}
    ],
    fadPrice: [
      {type: 'required', message: 'Giá món không được để trống.'},
      {type: 'pattern', message: 'Giá món chỉ có thể nhập số.'}
    ],
    fadImage: [
      {type: 'required', message: 'Ảnh món không được để trống.'},
    ],
    category: [
      {type: 'required', message: 'Nhóm món không được để trống.'},
    ]
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {'whitespace': true};
  }

  public customPatternValid(config: any): ValidatorFn {
    return (control: FormControl) => {
      let urlRegEx: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegEx)) {
        return {
          invalidMsg: config.msg
        };
      } else {
        return null;
      }
    };
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    return this.categoryService.findAllCategory().subscribe(list => {
      this.categoryList = list;
      console.log(this.categoryList);
    })
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
            this.foodAndDrinkService.create(value).subscribe(() => {
              setTimeout(() => {
                this.showSpinner = false;
                this.dialogRef.close();
                this.snackbarService.showSnackbar('Tạo món mới thành công', 'success')
              });
            });
          });
        })
      ).subscribe();
    } else {
      this.snackbarService.showSnackbar('Biểu mẫu sai, vui lòng nhập chính xác', 'error')
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
      this.imgSrc = './assets/img/default-placeholder.png';
      this.selectedImage = null;
    }
  }
}
