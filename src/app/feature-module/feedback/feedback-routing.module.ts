import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FeedbackListComponent} from "./feedback-list/feedback-list.component";
import {FeedbackCreateComponent} from "./feedback-create/feedback-create.component";


const routes: Routes = [ {path:"feedback/create", component: FeedbackCreateComponent},
  {path:"feed-back-list", component: FeedbackListComponent}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
