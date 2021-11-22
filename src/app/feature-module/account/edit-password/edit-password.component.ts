import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AccountService} from "../../../core-module/account/account.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {IEditPasswordAccountDto} from "../../../entity/iedit-password-account-dto";
import {IAccount} from "../../../entity/IAccount";
import {IEditAccount} from "../../../entity/IEditAccount";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('accountPassword').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : {notSame: true};
  }


  editPasswordAccountDto: IEditPasswordAccountDto;
  accountUsername: string;
  accountDto: IEditAccount;
  id: number;
  message: string;
  editPassAccountForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private matSnackBar: SnackbarService,
              private router: Router) {
    activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.accountUsername = paramMap.get('name')
      this.accountService.getUserByName(this.accountUsername).subscribe(next => {
        this.accountDto = next;
        this.id = this.accountDto.accountId;
        console.log(this.accountDto);
        this.editPassAccountForm =  new FormGroup({
          accountId: new FormControl(this.accountDto.accountId),
          accountPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('^[0-9a-zA-Z]+$')])),
          oldPassword: new FormControl(''),
          confirmPassword: new FormControl('')
        }, {validators: this.checkPasswords})
      })
    })
  }

  ngOnInit(): void {
  }

  validationPasswordEdit = {
    accountPassword: [
      {type: 'required', message: 'Mật khẩu không được để trống.'},
      {type: 'minlength', message: 'Mật khẩu không ít hơn 4 ký tự.'},
      {type: 'maxlength', message: 'Mật khẩu không vượt quá 30 ký tự.'},
      {type: 'pattern', message: 'Mật khẩu chỉ được nhập chữ cái in hoa, chữ cái và số.'}
    ]
  };


  submit() {

    this.editPasswordAccountDto = this.editPassAccountForm.value;
    console.log(this.editPassAccountForm)
    this.accountService.editPassword(this.editPasswordAccountDto).subscribe(() => {
        this.matSnackBar.showSnackbar("Thay đổi mật khẩu thành công", "success");
        this.editPassAccountForm.reset();
        window.sessionStorage.clear();
        // this.linkService.reloadComponent();
        this.router.navigateByUrl("");
      },
      error => {
        this.matSnackBar.showSnackbar("Mật khẩu cũ chưa đúng. Vui lòng nhập lại.", "error");
      });
  }

  backHome() {
    this.router.navigateByUrl("");
  }
}
