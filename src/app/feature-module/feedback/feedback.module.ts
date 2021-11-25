import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackRoutingModule } from './feedback-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ListFeedbackComponent } from './list-feedback/list-feedback.component';
import { DialogDetailComponent } from './dialog-detail/dialog-detail.component';
import {MatTableModule} from "@angular/material/table";
import {FeedbackCreateComponent} from "./feedback-create/feedback-create.component";



@NgModule({
  declarations: [ListFeedbackComponent, DialogDetailComponent,FeedbackCreateComponent],
    imports: [
        CommonModule,
        FeedbackRoutingModule,
        ShareModule,
        MatTableModule,
    ]
})
export class FeedbackModule { }
