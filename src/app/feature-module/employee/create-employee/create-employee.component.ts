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
import {invalid} from "@angular/compiler/src/render3/view/util";



@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  messAccount:String="";
  levelList:ILevel []=[];

  //thêm tối nay
  listAccount: any[];


  ngOnInit(): void {
    this.getAllLevel();
    this.employeeForm.value.employeeImage = this.image;
    this.getAllListAccount();
  }

  getAllListAccount(){
    this.employeeService.listAccount().subscribe(dataAccount =>{
      console.log(dataAccount)
      this.listAccount = dataAccount;
      console.log(this.listAccount);
    })
    console.log(this.listAccount);
  }

  // getAllLevel() {
  //   this.levelService.findAllLevel().subscribe(dataLevel => {
  //     this.levelList = dataLevel;
  //   });
  // }


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
      employeeBirthday:new FormControl('',[Validators.required,this.check18cong]),

      employeeSalary:new FormControl('',[Validators.required,Validators.min(1),this.checkSalary]),
      level:new FormControl('',[Validators.required]),
      accountName:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(50),
      //   this.customPatternValid({
      //   pattern: /^\s?\S+(?: \S+)*\s?$/, msg: 'Không thể nhập nhiều khoảng trắng.'
      // }),
        Validators.pattern('^[A-Za-z_]\\w*$'),
        this.checkAccountEmployee,
      ]),
    }
  )


  checkSalary(check: AbstractControl) {
    let salary=check.value;
    if (salary%100000===0) {
      return null;
    } else {
      return {'overSalary': true};
    }
  }

  booleanForm = true;
  onSearchChange(searchValue: string): void {
    for (let i = 0; i< this.listAccount.length; i++) {
      if (searchValue.trim() == this.listAccount[i]) {
        this.snackBar.showSnackbar("Tên đăng nhập đã được sử dụng.", 'error');
        this.booleanForm = false;
        break;
      } else {
        this.booleanForm = true;
        // this.snackBar.showSnackbar("Tên đăng nhập", 'success')
      }
    }
  }

  // checkAccountEmployee(checkAccount: AbstractControl) {
  //   let accountName=checkAccount.value;
  //   for(let i=0;i++;i<this.listAccount.length){
  //      if(this.listAccount[i] != accountName){
  //        return null
  //      }
  //      else {
  //        return {'oro':true}
  //      }
  //   }
  //
  // }

  checkAccountEmployee(checkAccount: AbstractControl) {
    let accountName=checkAccount.value;
    for(let i=0;i++;i<this.listAccount.length){
      if(this.listAccount[i] === accountName){
        console.log(accountName)
        console.log(this.listAccount)
        return {'oro':true}
      }
    }
  }

  constructor(private employeeService: EmployeeService, private levelService: LevelService, private router: Router,
              private snackBar: SnackbarService,
              private storage: AngularFireStorage,
              private dialog: MatDialog
  ) {
      this.getAllListAccount();
  }


  resetForm() {
    this.employeeForm.reset();
  }

  getAllLevel() {
    this.levelService.findAllLevel().subscribe(dataLevel => {
      this.levelList = dataLevel;
    });
    console.log(this.levelList);
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
      {type: 'maxlength', message: 'Tên đăng nhập tối đa 50 kí tự.'},
      {type: 'pattern', message: 'Tên không bắt đầu là số,tên không có dấu,tên không là kí tự đặc biệt,không có khoảng trắng.'},
      {type: 'overAccount', message: 'Tên đăng nhập không được là admin hoặc root.'},
      {type: 'oro', message: 'Tên đăng nhập đã được sử dụng,vui lòng chọn tên khác.'},
    ],

  };


  checkAccount(check: AbstractControl){
    if(check.value=='admin'||check.value=='root') {
      return {'overAccount': true}
    }
    else {
      return null
    }
  }

  check18cong(check: AbstractControl) {
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
          this.messAccount="Tên đăng nhập đã tồn tại."
        }
        this.snackBar.showSnackbar('Kiểm tra lại thông tin.', 'error');
      });
    }
    else {
      this.snackBar.showSnackbar('Vui lòng kiểm tra lại thông tin đã nhập.', 'error');
    }
  }

  checKAccount() {

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



