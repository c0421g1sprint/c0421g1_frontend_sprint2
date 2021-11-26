import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule } from './homepage-routing.module';
import {ShareModule} from "../../share-module/share.module";
import {HomepageBodyComponent} from "./homepage-body.component";



@NgModule({
  declarations: [HomepageBodyComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    ShareModule
  ]
})
export class HomepageModule { }
