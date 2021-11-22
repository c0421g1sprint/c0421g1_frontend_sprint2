import {NgModule} from "@angular/core";
import {CategoryListComponent} from "./category-list/category-list.component";
import {CategoryCreateComponent} from "./category-create/category-create.component";
import {CategoryUpdateComponent} from "./category-update/category-update.component";
import {CategoryComponent} from "./category.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../share-module/share.module";
import {CategoryRoutingModule} from "./category-routing.module";

@NgModule({
  declarations: [CategoryListComponent, CategoryCreateComponent, CategoryUpdateComponent, CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ShareModule
  ]
})
export class CategoryModule {
}
