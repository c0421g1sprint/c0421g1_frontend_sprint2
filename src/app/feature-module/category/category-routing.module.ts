import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CategoryComponent} from "./category.component";
import {ListCategoryComponent} from "./list-category/list-category.component";


const routes: Routes = [
  {path: 'category', component: CategoryComponent,
    children: [
      {path: 'list', component: ListCategoryComponent}
    ]},
];
@NgModule({
  // declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
