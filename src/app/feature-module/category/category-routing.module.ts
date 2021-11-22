import {RouterModule, Routes} from "@angular/router";
import {CategoryComponent} from "./category.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {CategoryUpdateComponent} from "./category-update/category-update.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: "category", component: CategoryComponent,
    children: [
      {path: "list", component: CategoryListComponent},
      {path: "update/:id", component: CategoryUpdateComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
