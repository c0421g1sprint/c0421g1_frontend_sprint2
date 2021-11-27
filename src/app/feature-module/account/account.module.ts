import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountRoutingModule} from './account-routing.module';
import {ShareModule} from '../../share-module/share.module';
import {AccountComponent} from "./account.component";
import {UserDetailComponent} from './user-detail/user-detail.component';
import {EditPasswordComponent} from './edit-password/edit-password.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgxLoadingModule} from "ngx-loading";
import { ForgetComponent } from './forget/forget.component';

@NgModule({
  declarations: [AccountComponent, UserDetailComponent, EditPasswordComponent, ForgetComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ShareModule,
    NgxLoadingModule
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}}
  ]
})
export class AccountModule {
}
