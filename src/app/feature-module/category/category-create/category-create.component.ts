import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private router: Router,
              private snackBarService: SnackbarService,
              private dialogRef: MatDialogRef<any>) {
  }

  createForm: FormGroup = new FormGroup({
    categoryId: new FormControl(''),
    categoryName: new FormControl('', [Validators.required,
      Validators.minLength(2), Validators.maxLength(30),
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]*$/),
      this.customPatternValid({
        pattern: /^\s?\S+(?: \S+)*\s?$/, msg: 'Không thể nhập nhiều khoảng trắng.'
      })]),
    categoryCode: new FormControl('', [Validators.required,
      Validators.minLength(3), Validators.maxLength(10),
      this.noWhitespaceValidator]),
    deleteFlag: new FormControl('')
  })

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
  }

  ngOnInit(): void {
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

  createCategory(createForm) {
    const value = this.createForm.value;
    console.log(value);
    if (this.createForm.valid) {
      this.categoryService.create(value).subscribe(() => {
        this.dialogRef.close()
        this.snackBarService.showSnackbar('Tạo nhóm mói thành công', 'success')
      });
    } else {
      this.snackBarService.showSnackbar('Biểu mẫu sai, vui lòng nhập chính xác', 'error')
    }
  }

}
