import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackRoutingModule } from './feedback-routing.module';
import {ShareModule} from '../../share-module/share.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ShareModule
  ]
})
export class FeedbackModule { }
