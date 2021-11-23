import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CategoryComponent} from "./category.component";
import {ListCategoryComponent} from "./list-category/list-category.component";
import {CategoryUpdateComponent} from "./category-update/category-update.component";
import {CommonModule} from "@angular/common";


const routes: Routes = [
  {
    path: 'category', component: CategoryComponent,
    children: [
      {path: 'list', component: ListCategoryComponent},
      {path: "update/:id", component: CategoryUpdateComponent}
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
