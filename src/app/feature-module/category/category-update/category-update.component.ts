import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ICategory} from "../../../entity/ICategory";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  category: ICategory;
  id: number;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBarService: SnackbarService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  editForm = new FormGroup({
    categoryId: new FormControl(''),
    categoryName: new FormControl('', [Validators.required,
      Validators.minLength(2), Validators.maxLength(30),
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]*$/),
      this.customPatternValid({
        pattern: /^\s?\S+(?: \S+)*\s?$/, msg: 'Không thể nhập nhiều khoảng trắng.'
      })]),
    categoryCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10),
      this.noWhitespaceValidator]),
    deleteFlag: new FormControl('')
  })

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

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {'whitespace': true};
  }

  validationMessage = {
    categoryName: [
      {type: 'required', message: 'Nhóm món không được để trống.'},
      {type: 'pattern', message: 'Nhóm món không được chứa ký tự đặc biệt và số.'}
    ],
    categoryCode: [
      {type: 'required', message: 'Mã số nhóm món không được để trống'}
    ]
  };

  ngOnInit(): void {
    this.getCategory(this.id)
  }

  getCategory(id: number) {
    return this.categoryService.findCategoryById(id).subscribe(item => {
      this.category = item;
      console.log(this.category);
      this.editForm.setValue(item);
    })
  }

  updateCategory(editForm) {
    const value = this.editForm.value;
    console.log(value)
    if (this.editForm.valid) {
      this.categoryService.update(value).subscribe(() => {
        this.snackBarService.showSnackbar("Sửa nhóm món thành công", "success");
        this.router.navigateByUrl('/category/list');
      });
    } else {
      this.snackBarService.showSnackbar('Biểu mẫu sai, vui lòng nhập đúng', 'error')
    }
  }
}
