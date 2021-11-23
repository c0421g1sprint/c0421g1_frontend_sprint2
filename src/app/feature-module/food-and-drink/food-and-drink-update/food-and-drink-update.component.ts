import {Component, OnInit} from '@angular/core';
import {IFoodAndDrink} from "../../../entity/IFoodAndDrink";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ICategory} from "../../../entity/ICategory";
import {FoodAndDrinkService} from "../../../core-module/food_and_drink/food-and-drink.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-food-and-drink-update',
  templateUrl: './food-and-drink-update.component.html',
  styleUrls: ['./food-and-drink-update.component.css']
})
export class FoodAndDrinkUpdateComponent implements OnInit {

  foodAndDrink: IFoodAndDrink;
  categoryList: ICategory[];
  showSpinner = false;
  imgSrc: any;
  id: number;
  private selectedImage: any;

  editForm = new FormGroup({
    fadId: new FormControl(''),
    fadName: new FormControl('', [Validators.required,
      Validators.minLength(5), Validators.maxLength(50),
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]*$/),
      this.customPatternValid({
        pattern: /^\s?\S+(?: \S+)*\s?$/, msg: 'Không thể nhập nhiều khoảng trắng.'
      })
    ]),
    fadCode: new FormControl('', [Validators.required,
      Validators.minLength(3), Validators.maxLength(10),
      Validators.pattern(/^\s?\S+(?: \S+)*\s?$/),
    ]),
    fadImage: new FormControl('', [Validators.required]),
    fadPrice: new FormControl('', [Validators.required,
      Validators.pattern(/^[0-9]*$/),
    ]),
    category: new FormControl(' ', Validators.required),
    deleteFlag: new FormControl(''),
    fadWaitTime: new FormControl(''),
  })

  constructor(private foodAndDrinkService: FoodAndDrinkService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private snackBar: SnackbarService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  validationMessage = {
    fadName: [
      {type: 'required', message: 'Món không được để trống.'},
      {type: 'pattern', message: 'Món không được chứa ký tự đặc biệt và số.'}
    ],
    fadCode: [
      {type: 'required', message: 'Mã Món không được để trống.'},
      {type: 'pattern', message: 'Mã Món không được nhập nhiều khoảng trắng.'},
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

  public noWhiteSpaceValidator(control: FormControl) {
    const isWhiteSpace = (control.value || '').trim().length === 0;
    const isValid = !isWhiteSpace;
    return isValid ? null : {'whitespace': true};
  }

  getFoodAndDrink(id: number) {
    if (id != null) {
      return this.foodAndDrinkService.findById(id).subscribe(item => {
        this.foodAndDrink = item;
        this.imgSrc = this.foodAndDrink.fadImage;
        console.log(this.foodAndDrink);
        this.editForm.setValue(item);
      })
    } else {
      alert("Không tìm thấy món");
    }
  }

  getCategory() {
    return this.categoryService.findAllCategory().subscribe(list => {
      this.categoryList = list;
      this.getFoodAndDrink(this.id);
    });
  }

  ngOnInit(): void {
    this.getCategory();
  }

  updateFoodAndDrink(editForm) {
    const value = this.editForm.value;
    console.log(value);
    if (this.editForm.valid) {
      this.showSpinner = true;
      var filePath = `foodAndDrinkImages/${editForm.value.fadName}_${editForm.value.fadCode}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url => {
            this.editForm.value.fadImage = url;
            console.log(url);
            this.foodAndDrinkService.update(value).subscribe(() => {
              setTimeout(() => {
                this.showSpinner = false;
                this.snackBar.showSnackbar("Sửa thông tin món thành công", "success");
              })
              // this.router.navigate(['students', {
              //   "idClassroom": this.student.classroom.classroomId
              // }]);
            });
          }));
        })
      ).subscribe();
    } else {
      this.snackBar.showSnackbar('Biễu mẫu sai, vui lòng nhập lại', "error");
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/default-placeholder.png';
      this.selectedImage = null;
    }
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.editForm.patchValue({
          fadImage: reader.result
        });
      };
    }
  }

  defaultValue
}
