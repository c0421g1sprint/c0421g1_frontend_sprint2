import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FeedbackCreateComponent} from "./feedback-create/feedback-create.component";


const routes: Routes = [ {path:"feedback/create", component: FeedbackCreateComponent},
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
