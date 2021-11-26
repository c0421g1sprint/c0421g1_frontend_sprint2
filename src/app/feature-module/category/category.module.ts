import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryRoutingModule} from "./category-routing.module";
import {ListCategoryComponent} from './list-category/list-category.component';
import {ShareModule} from "../../share-module/share.module";
import {CategoryComponent} from "./category.component";
import {CategoryCreateComponent} from "./category-create/category-create.component";
import {CategoryUpdateComponent} from "./category-update/category-update.component";


@NgModule({
  declarations: [ListCategoryComponent, CategoryComponent, CategoryCreateComponent, CategoryUpdateComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ShareModule
  ]
})
export class CategoryModule {
}
