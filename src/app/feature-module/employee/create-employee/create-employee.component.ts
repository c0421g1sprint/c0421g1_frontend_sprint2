import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ILevel} from "../../../entity/ILevel";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {EmployeeService} from "../../../core-module/employee/employee.service";
import {LevelService} from "../../../core-module/employee/level.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  messAccount:String="";
  levelList:ILevel []=[];

  // selectedFile: File = null;
  image='http://vietsolutionco.com/assets/theme/img/avatar.jpg'
  downloadURL: Observable<string>;
  imgSrc: string = '';
  selectedImage: any = null;

  employeeForm=new FormGroup(
    {
      employeeName:new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]*$/),
        this.customPatternValid({
          pattern: /^\s?\S+(?: \S+)*\s?$/, msg: 'Không thể nhập nhiều khoảng trắng.'
        })
      ]),
      employeeAddress:new FormControl('',[Validators.required,
        this.customPatternValid({
          pattern: /^\s?\S+(?: \S+)*\s?$/, msg: 'Không thể nhập nhiều khoảng trắng.'
        }),
      ]),
      employeePhone:new FormControl('',[Validators.required,

Validators.pattern('^(090|091|\\(84\\)\\+90|\\(84\\)\\+91)[0-9]{7}$')
        ],),

      employeeImage:new FormControl(''),
      employeeGender:new FormControl('',[Validators.required]),
      employeeBirthday:new FormControl('',[Validators.required,this.check18]),

      employeeSalary:new FormControl('',[Validators.required,Validators.min(1),this.checkSalary]),
      level:new FormControl('',[Validators.required]),
      accountName:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(50),this.customPatternValid({
        pattern: /^\s?\S+(?: \S+)*\s?$/, msg: 'Không thể nhập nhiều khoảng trắng.'
      }),
        Validators.pattern('^[A-Za-z_]\\w*$'),
        this.checkAccount
      ]),
    }
  )

  constructor(private employeeService: EmployeeService, private levelService: LevelService, private router: Router,
              private snackBar: SnackbarService,
              private storage: AngularFireStorage,
              private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllLevel();
    this.employeeForm.value.employeeImage = this.image;
  }

  resetForm() {
    this.employeeForm.reset();
  }

  getAllLevel() {
    this.levelService.findAllLevel().subscribe(dataLevel => {
      this.levelList = dataLevel;
    });
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

  validationMessage = {
    employeeName: [
      {type: 'required', message: 'Tên nhân viên không được để trống.'},
      {type: 'minlength', message: 'Tên nhân viên tối thiểu phải có 3 kí tự.'},
      {type: 'maxlength', message: 'Tên nhân viên tối đa 50 kí tự.'},
      {type: 'pattern', message: 'Tên nhân viên không được chứa ký tự đặc biệt và số.'},
    ],
    employeeAddress: [
      {type: 'required', message: 'Địa chỉ không được để trống.'},
    ],
    employeePhone: [
      {type: 'required', message: 'Số điện thoại không dc để trống.'},
      {type: 'pattern', message: 'Số điện thoại phải đúng định dạng 090xxxxxxx hoặc 091xxxxxxx hoặc (84)+90xxxxxxx hoặc (84)+91xxxxxxx.'},
    ],

    employeeImage: [
    ],
    employeeGender: [
      {type: 'required', message: 'Vui lòng chọn giới tính của nhân viên.'},
    ],
    employeeBirthday: [
      {type: 'required', message: 'Vui lòng chọn ngày sinh.'},
      {type: 'invalidAge', message: 'Tuổi của nhân viên phải lớn hơn 18 tuổi.'},
      {type: 'overAge', message: 'Tuổi của nhân viên phải nhỏ hơn 100 tuổi '}
    ],

    employeeSalary: [
      {type: 'min', message: 'Lương phải lớn hơn không.'},
      {type: 'required', message: 'Lương phải không được để trống.'},
      {type: 'overSalary', message: 'Lương phải là bội số của 100 000 vnd.'},
    ],
    level: [
      {type: 'required', message: 'Vui lòng chọn vị trí.'},
    ],
    accountName: [
      {type: 'required', message: 'Tên đăng nhập không được để trống.'},
      {type: 'minlength', message: 'Tên đăng nhập tối thiểu phải có 6 kí tự.'},
      {type: 'maxlength', message: 'Tên đăng nhập không tối đa 50 kí tự.'},
      {type: 'pattern', message: 'Tên đăng nhập không bắt đầu là số,không có dấu và phải viết liền.'},
      {type: 'overAccount', message: 'Tên đăng nhập không được là admin hoặc root.'},
    ],

  };



  checkSalary(check: AbstractControl) {
  let salary=check.value;
  if (salary%100000===0) {
    return null;
  } else {
    return {'overSalary': true};
  }
}

  checkAccount(check: AbstractControl){
    if(check.value=='admin'||check.value=='root') {
      return {'overAccount': true}
    }
    else {
      return null
    }
  }

  check18(check: AbstractControl) {
    let birthday = new Date(check.value);
    let age = Date.now() - birthday.getTime() - 86400000;
    const ageDate = new Date(age);
    age = ageDate.getUTCFullYear() - 1970;
    console.log(age);
    if (age < 18) {
      return {'invalidAge': true};
    } else if (age > 100) {
      return {'overAge': true};
    }
    return null;
  }

  saveEmployee() {
    const employee=this.employeeForm.value;

    if(this.employeeForm.valid){
      this.employeeForm.value.employeeImage = this.image;
      this.employeeService.saveEmployee(employee).subscribe(data => {
        this.messAccount=""
        window.location.reload();
        console.log(this.employeeForm.value);
        this.snackBar.showSnackbar('Thêm mới thành công', 'success');
        this.messAccount='';
      }, error => {
        if(error.status=='406') {
          this.messAccount="tên đăng nhập đã tồn tại"
        }
        this.snackBar.showSnackbar('Thêm mới thất  bại.', 'error');
      });
    }
    else {
      this.snackBar.showSnackbar('Vui lòng kiểm tra lại thông tin đã nhập.', 'error');
    }
  }

  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.image = url;
              this.imgSrc = url;
              this.employeeForm.value.image= this.image
              console.log( this.employeeForm.value.image + " 123");
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];

    } else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }

}




//
// ____Bài cũ________
//
// messAccount:String="";
// levelList:ILevel []=[];
//
// selectedFile: File = null;
// image;
// downloadURL: Observable<string>;
// imgSrc: string = '';
// selectedImage: any = null;
//
// employeeForm=new FormGroup(
//   {
//     employeeName:new FormControl('',[Validators.required]),
//     employeeAddress:new FormControl('',[Validators.required]),
//     employeePhone:new FormControl('',[Validators.required]),
//
//     employeeImage:new FormControl(''),
//     employeeGender:new FormControl(''),
//     employeeBirthday:new FormControl(''),
//
//     employeeSalary:new FormControl('',[Validators.min(1)]),
//     level:new FormControl('',[Validators.required]),
//     accountName:new FormControl('',[Validators.required]),
//   }
// )
//
// constructor(private employeeService: EmployeeService, private levelService: LevelService, private router: Router,
//   private snackBar: SnackbarService,
//   private storage: AngularFireStorage,
// ) { }
//
// ngOnInit(): void {
//   this.employeeForm.reset();
//   this.getAllLevel();
// }
//
// getAllLevel() {
//   this.levelService.findAllLevel().subscribe(dataLevel => {
//     this.levelList = dataLevel;
//   });
// }
//
// saveEmployee() {
//   const employee=this.employeeForm.value;
//
//   if(this.employeeForm.valid){
//     // this.employeeForm.value.employeeImage = url;
//     this.employeeService.saveEmployee(employee).subscribe(data => {
//       window.location.reload();
//       console.log(this.employeeForm.value);
//       this.snackBar.showSnackbar('Thêm mới thành công', 'success');
//       this.messAccount='';
//     }, error => {
//       if(error.status=='406') {
//         this.messAccount="tên đăng nhập đã tồn tại"
//       }
//       this.snackBar.showSnackbar('Thêm mới thất  bại', 'error');
//     });
//   }
//   else {
//     this.snackBar.showSnackbar('Vui lòng điền thông tin', 'error');
//   }
// }
//
// validationMessage = {
//   employeeName: [
//     {type: 'required', message: 'Họ và tên  không được để trống.'},
//   ],
//   employeeAddress: [
//     {type: 'required', message: 'Địa chỉ không được để trống.'},
//   ],
//   employeePhone: [
//     {type: 'required', message: 'sdt ko dc để trống'},
//   ],
//
//   employeeImage: [
//   ],
//   employeeGender: [
//   ],
//   employeeBirthday: [
//   ],
//
//   employeeSalary: [
//     {type: 'min', message: 'Lương phải lớn hơn không'},
//     {type: 'overSalary', message: 'Lương phải là bội số của 100'},
//   ],
//   level: [
//     {type: 'required', message: 'Vui lòng chọn vị trí'},
//   ],
//   accountName: [
//     {type: 'required', message: 'Tên đăng nhập không được để trống.'},
//   ],
//
// };
//
// checkSalary(check: AbstractControl) {
//   let salary=check.value;
//   if (salary%100===0) {
//     return {'invalidSalary': true};
//   } else {
//     return {'overSalary': true};
//   }
// }
//
//
// onFileSelected(event) {
//   var n = Date.now();
//   const file = event.target.files[0];
//   const filePath = `RoomsImages/${n}`;
//   const fileRef = this.storage.ref(filePath);
//   const task = this.storage.upload(`RoomsImages/${n}`, file);
//   task
//     .snapshotChanges()
//     .pipe(
//       finalize(() => {
//         this.downloadURL = fileRef.getDownloadURL();
//         this.downloadURL.subscribe(url => {
//           if (url) {
//             this.image = url;
//             this.employeeForm.value.image= this.image
//           }
//           console.log( this.employeeForm.value.image + " 123");
//         });
//       })
//     )
//     .subscribe(url => {
//       if (url) {
//         console.log(url);
//       }
//     });
// }
//
// showPreview(event: any) {
//   if (event.target.files && event.target.files[0]) {
//     const reader = new FileReader();
//     reader.onload = (e: any) => this.imgSrc = e.target.result;
//     reader.readAsDataURL(event.target.files[0]);
//     this.selectedImage = event.target.files[0];
//
//   } else {
//     this.imgSrc = '';
//     this.selectedImage = null;
//   }
// }
