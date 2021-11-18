import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AccountService} from "../../../core-module/account/account.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IEditPasswordAccountDto} from "../../../entity/iedit-password-account-dto";
import {IAccount} from "../../../entity/IAccount";
import {IEditAccount} from "../../../entity/IEditAccount";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  editPasswordAccountDto: IEditPasswordAccountDto;
  accountUsername: string;
  accountDto: IEditAccount;
  id: number;
  message: string;

  constructor(private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private matSnackBar: SnackbarService,
              private router: Router) {
    activatedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      this.accountUsername=paramMap.get('name')
      this.accountService.getUserByName(this.accountUsername).subscribe(next=>{
             this.accountDto = next;
             this.id = this.accountDto.accountId;
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
  editPassAccountForm: FormGroup  = new FormGroup({
    accountPassword: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('^[0-9a-zA-Z]+$')])),
    oldPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  })
  submit() {
    this.editPassAccountForm.patchValue({accountId: this.id});
    this.editPasswordAccountDto = this.editPassAccountForm.value;
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
