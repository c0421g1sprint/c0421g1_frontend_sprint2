import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import {ShareModule} from '../../share-module/share.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ShareModule
  ],
})
export class AccountModule { }
