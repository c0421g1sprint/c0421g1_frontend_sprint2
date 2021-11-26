import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListFeedbackComponent} from "./list-feedback/list-feedback.component";
import {FeedbackCreateComponent} from "./feedback-create/feedback-create.component";


const routes: Routes = [
  {path: "feed-back-list", component: ListFeedbackComponent},
  {path: "feedback/create", component: FeedbackCreateComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {
}
