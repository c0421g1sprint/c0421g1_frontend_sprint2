import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';

@NgModule({
  declarations: [UserDetailComponent, EditPasswordComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ShareModule
  ],
})
export class AccountModule { }
