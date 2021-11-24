import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ILevel} from "../../../entity/ILevel";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {EmployeeService} from "../../../core-module/employee/employee.service";
import {LevelService} from "../../../core-module/employee/level.service";
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {IEmployee} from "../../../entity/IEmployee";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee: IEmployee;
  levelList: ILevel [] = [];
  messAccount: String = "";
  showSpinner = false;

  selectedFile: File = null;
  id: number;
  image;
  downloadURL: Observable<string>;
  imgSrc: string = '';
  selectedImage: any = null;
  public subcriptionParam: Subscription | undefined;
  employeeForm: FormGroup = new FormGroup({

    employeeId: new FormControl(''),

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

    employeeImage: new FormControl(''),
    employeeGender: new FormControl('',[Validators.required]),
    employeeBirthday:new FormControl('',[Validators.required,this.check18]),

    employeeSalary: new FormControl('', [Validators.required, Validators.min(1), this.checkSalary]),
    level: new FormControl('', [Validators.required]),
    accountName: new FormControl(''),

  })

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private activeRouter: ActivatedRoute,
              private levelService: LevelService,
              private storage: AngularFireStorage,
              private snackBar: SnackbarService) {
  }

  ngOnInit(): void {
    this.getAllLevel();
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

  getAllLevel() {
    this.levelService.findAllLevel().subscribe(dataLevel => {
      this.levelList = dataLevel;
    }, error => {
      console.log(error.message);
    }, () => {
      console.log('2');
      this.loadData();
    });
  }

  loadData() {
    this.subcriptionParam = this.activeRouter.params.subscribe((data: Params) => {
      this.id = data['id'];
      console.log(this.id);
      this.employeeService.findByIdEmployee(this.id).subscribe((employeeData: IEmployee) => {
        this.employee = employeeData;
        if(this.employee.employeeImage==null||this.employee.employeeImage==''||this.employee.employeeImage=='ac.png'){

          this.employee.employeeImage='http://vietsolutionco.com/assets/theme/img/avatar.jpg'
        }
        this.imgSrc = this.employee.employeeImage;
        console.log(this.employee);
        this.employeeForm.patchValue({
          employeeId: this.employee.employeeId,

          employeeName: this.employee.employeeName,
          employeeAddress: this.employee.employeeAddress,
          employeePhone: this.employee.employeePhone,

          employeeImage: this.employee.employeeImage,
          employeeGender: this.employee.employeeGender,
          employeeBirthday: this.employee.employeeBirthday,

          employeeSalary: this.employee.employeeSalary,
          level: this.employee.level.levelId,
          accountName: this.employee.accountName,
        });
        console.log(this.employeeForm.value);
      },

      error => {
        this.snackBar.showSnackbar('Nhân viên này không tồn tại trong database.', 'error');
      }

      );
    });

  }

  update(): void {
    for (let level of this.levelList) {
      if (level.levelId == this.employeeForm.value.level) {
        this.employeeForm.value.level = level;
        console.log(this.employeeForm);
      }
    }

    if (this.employeeForm.valid) {
      this.showSpinner = true;
      const value = this.employeeForm.value;
      var filePath = `images/${this.employeeForm.value.employeeName}_${this.employeeForm.value.id}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url => {
            if (this.employeeForm.value.employeeImage == null) {
              this.employeeForm.value.employeeImage = this.employee.employeeImage;
              console.log(this.employee.employeeImage + " demo moemoeemo");
            } else {
              this.employeeForm.value.employeeImage = this.imgSrc;
              console.log(this.imgSrc);
            }
            this.employeeService.updateEmployee(value).subscribe(() => {
              setTimeout(() => {
                this.showSpinner = false;
                this.messAccount = "";
                this.snackBar.showSnackbar('Sửa thông tin nhân viên thành công', 'success');
                // this.router.navigateByUrl("employee/list");
              })
            },error => {
              this.showSpinner = false;
                this.snackBar.showSnackbar('Vui lòng điền đầy đủ thông tin .', 'error');
              }
            );
          }));
        })
      ).subscribe();
    } else {
      this.snackBar.showSnackbar('Vui lòng điền , chọn đầy đủ thông tin', 'error');
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
            }
            console.log(this.image);
            this.employeeForm.value.employeeImage = this.image;
            // this.imgSrc=this.image;
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

  validationMessage = {
    employeeId: [
    ],

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

    employeeImage: [],
    employeeGender: [
      {type: 'required', message: 'Vui lòng chọn giới tính của nhân viên.'},
    ],
    employeeBirthday: [
      {type: 'required', message: 'Vui lòng chọn ngày sinh.'},
      {type: 'invalidAge', message: 'Tuổi của nhân viên phải lớn hơn 18 tuổi.'},
      {type: 'overAge', message: 'Tuổi của nhân viên phải nhỏ hơn 100 tuổi.'}
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
      // {type: 'required', message: 'Tên đăng nhập không được để trống.'},
    ],

  };

  checkSalary(check: AbstractControl) {
    let salary = check.value;
    if (salary % 100000 === 0) {
      return null;
    } else {
      return {'overSalary': true};
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


}


//
//
// id: number;
// messAccount:String="";
// levelList:ILevel []=[];
// employee:IEmployee
//
// showSpinner = false;
// employeeForm: FormGroup;
// // selectedFile: File = null;
// // image;
// // downloadURL: Observable<string>;
// // imgSrc: string = '';
// // selectedImage: any = null;
// // public subcription: Subscription | undefined;
// // public subcriptionParam: Subscription | undefined;
//
// // employeeForm=new FormGroup(
// //   {
// //     employeeId:new FormControl(''),
// //
// //     employeeName:new FormControl('',[Validators.required]),
// //     employeeAddress:new FormControl('',[Validators.required]),
// //     employeePhone:new FormControl('',[Validators.required]),
// //
// //     employeeImage:new FormControl(''),
// //     employeeGender:new FormControl(''),
// //     employeeBirthday:new FormControl(''),
// //
// //     employeeSalary:new FormControl('',[Validators.required,Validators.min(1),this.checkSalary]),
// //     level:new FormControl('',[Validators.required]),
// //     accountName:new FormControl('',[Validators.required]),
// //   }
// // )
//
// validationMessage = {
//   employeeId: [
//   ],
//
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
//     {type: 'required', message: 'Lương phải không được để trống'},
//     {type: 'overSalary', message: 'Lương phải là bội số của 100 000'},
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
// private selectedImage: any;
// imgSrc: any;
//
// constructor(private employeeService: EmployeeService,
//             private levelService: LevelService,
//             private router: Router,
//             private snackBar: SnackbarService,
//             private activatedRoute: ActivatedRoute,
//             // private activated: ActivatedRoute,
//             private storage: AngularFireStorage,
// ) {
//   // this.id = activated.snapshot.params.id;
//   this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
//     this.id = +paramMap.get('id');
//     this.getEmployee(this.id);
//   });
// }
//
//
//
// ngOnInit(): void {
//   // this.employeeForm.reset();
//   this.getAllLevel();
// }
//
// getEmployee(index: number) {
//   return this.employeeService.findByIdEmployee(index).subscribe(item => {
//     this.employeeForm=new FormGroup(
//       {
//         employeeId:new FormControl(''),
//
//         employeeName:new FormControl('',[Validators.required]),
//         employeeAddress:new FormControl('',[Validators.required]),
//         employeePhone:new FormControl('',[Validators.required]),
//
//         employeeImage:new FormControl(''),
//         employeeGender:new FormControl(''),
//         employeeBirthday:new FormControl(''),
//
//         employeeSalary:new FormControl('',[Validators.required,Validators.min(1),this.checkSalary]),
//         level:new FormControl('',[Validators.required]),
//         accountName:new FormControl('',[Validators.required]),
//       }
//     )
//     this.employee = item;
//     this.imgSrc = this.employee.employeeImage;
//     // this.employeeForm.setValue(item);
//     this.employeeForm.setValue(this.employee);
//    console.log(this.employeeForm.value)
//     console.log(item);
//   });
// }
//
// //
// // getAllLevel() {
// //   this.levelService.findAllLevel().subscribe(dataLevel => {
// //     this.levelList = dataLevel;
// //     console.log(dataLevel);
// //   });
// // }
//
// // getAllDivision() {
// //   this.divisionService.findAll().subscribe(dataDivision => {
// //     this.divisionList = dataDivision;
// //   }, error => {
// //     console.log(error.message);
// //   }, () => {
// //     console.log('2');
// //     this.loadData();
// //   });
// // }
// getAllLevel() {
//   this.levelService.findAllLevel().subscribe(
//     next => {
//       this.levelList = next;
//     }, error => {
//       console.log(error.message);
//     }, () => {
//       // this.getEmployee();
//       console.log('1');
//     }
//   );
// }
//
//
// edit(employeeForm) {
//   const value = this.employeeForm.value;
//   console.log(value);
//   if (this.employeeForm.valid) {
//     this.showSpinner = true;
//     var filePath = `images/${employeeForm.value.employeeName}_${employeeForm.value.id}`;
//     const fileRef = this.storage.ref(filePath);
//     this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
//       finalize(() => {
//         fileRef.getDownloadURL().subscribe((url => {
//           this.employeeForm.value.employeeImage = url;
//           console.log(url);
//           this.employeeService.updateEmployee(value).subscribe(() => {
//             setTimeout(() => {
//               this.showSpinner = false;
//               this.snackBar.showSnackbar("Sửa thông tin nhân viên thành công", "success");
//             })
//             // this.router.navigate(['students', {
//             //   "idClassroom": this.student.classroom.classroomId
//             // }]);
//           });
//         }));
//       })
//     ).subscribe();
//   } else {
//     this.snackBar.showSnackbar('Biễu mẫu sai, vui lòng nhập lại', "error");
//   }
// }
//
// showPreview(event: any) {
//   if (event.target.files && event.target.files[0]) {
//     const reader = new FileReader();
//     reader.onload = (e: any) => this.imgSrc = e.target.result;
//     reader.readAsDataURL(event.target.files[0]);
//     this.selectedImage = event.target.files[0];
//   } else {
//
//     this.imgSrc = '/assets/img/anhthe.jpg';
//
//     this.selectedImage = null;
//   }
//   let reader = new FileReader();
//   if (event.target.files && event.target.files.length) {
//     const [file] = event.target.files;
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       this.employeeForm.patchValue({
//         studentImage: reader.result
//       });
//     };
//   }
// }
//
//
// checkSalary(check: AbstractControl) {
//   let salary=check.value;
//   if (salary%100===0) {
//     return null;
//   } else {
//     return {'overSalary': true};
//   }
// }
//
// compareFn(c1: any, c2: any): boolean {
//   return c1 && c2 ? c1.levelId === c2.levelId : c1 === c2;
// }
//


//
// id: number;
// messAccount:String="";
// levelList:ILevel []=[];
//
// // selectedFile: File = null;
// // image;
// // downloadURL: Observable<string>;
// // imgSrc: string = '';
// // selectedImage: any = null;
// // public subcription: Subscription | undefined;
// // public subcriptionParam: Subscription | undefined;
//
// employeeForm=new FormGroup(
//   {
//     employeeId:new FormControl(''),
//
//     employeeName:new FormControl('',[Validators.required]),
//     employeeAddress:new FormControl('',[Validators.required]),
//     employeePhone:new FormControl('',[Validators.required]),
//
//     employeeImage:new FormControl(''),
//     employeeGender:new FormControl(''),
//     employeeBirthday:new FormControl(''),
//
//     employeeSalary:new FormControl('',[Validators.required,Validators.min(1),this.checkSalary]),
//     level:new FormControl('',[Validators.required]),
//     accountName:new FormControl('',[Validators.required]),
//   }
// )
//
// validationMessage = {
//   employeeId: [
//   ],
//
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
//     {type: 'required', message: 'Lương phải không được để trống'},
//     {type: 'overSalary', message: 'Lương phải là bội số của 100 000'},
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
// constructor(private employeeService: EmployeeService,
//   private levelService: LevelService,
//   private router: Router,
//   private snackBar: SnackbarService,
//   private activeRouter: ActivatedRoute,
//   private activated: ActivatedRoute,
//   private storage: AngularFireStorage,
// ) {
//   this.id = activated.snapshot.params.id;
// }
//
// ngOnInit(): void {
//   this.setEditForm()
//   this.employeeForm.reset();
//   this.getAllLevel();
// }
//
// getAllLevel() {
//   this.levelService.findAllLevel().subscribe(dataLevel => {
//     this.levelList = dataLevel;
//     console.log(dataLevel);
//   });
// }
//
// setEditForm() {
//   this.employeeService.findByIdEmployee(this.id).subscribe(data => {
//     this.employeeForm.setValue(data)
//   })
// }
//
// updateEmployee() {
//   const employee=this.employeeForm.value;
//   if(this.employeeForm.valid){
//     this.employeeService.updateEmployee(employee).subscribe(data => {
//       window.location.reload();
//       console.log(this.employeeForm.value);
//       this.snackBar.showSnackbar('Đã sửa thành công.', 'success');
//       this.messAccount='';
//     }, error => {
//       if(error.status=='406') {
//         this.messAccount="Tên đăng nhập đã tồn tại."
//       }
//       this.snackBar.showSnackbar('Sửa thất  bại', 'error');
//     });
//   }
//   else {
//     this.snackBar.showSnackbar('Vui lòng điền lại thông tin', 'error');
//   }
// }
//
//
// checkSalary(check: AbstractControl) {
//   let salary=check.value;
//   if (salary%100===0) {
//     return null;
//   } else {
//     return {'overSalary': true};
//   }
// }

