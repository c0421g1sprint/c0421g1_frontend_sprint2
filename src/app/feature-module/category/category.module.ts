import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryRoutingModule} from "./category-routing.module";
import { ListCategoryComponent } from './list-category/list-category.component';
import {ShareModule} from "../../share-module/share.module";
import {CategoryComponent} from "./category.component";




@NgModule({
  declarations: [ListCategoryComponent,CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ShareModule
  ]
})
export class CategoryModule { }
