import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FeedbackComponent} from "./feedback.component";
import {ListFeedbackComponent} from "./list-feedback/list-feedback.component";


const routes: Routes = [
  {
    path : "feed-back-list", component: ListFeedbackComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
