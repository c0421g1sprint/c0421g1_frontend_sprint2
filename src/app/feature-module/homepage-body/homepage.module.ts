import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule } from './homepage-routing.module';
import {ShareModule} from "../../share-module/share.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    ShareModule
  ]
})
export class HomepageModule { }
