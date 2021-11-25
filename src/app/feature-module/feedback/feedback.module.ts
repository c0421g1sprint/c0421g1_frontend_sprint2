import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackRoutingModule } from './feedback-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ListFeedbackComponent } from './list-feedback/list-feedback.component';
import { DialogDetailComponent } from './dialog-detail/dialog-detail.component';
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [ListFeedbackComponent, DialogDetailComponent],
    imports: [
        CommonModule,
        FeedbackRoutingModule,
        ShareModule,
        MatTableModule,
    ]
})
export class FeedbackModule { }
