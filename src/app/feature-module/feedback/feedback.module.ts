import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackRoutingModule } from './feedback-routing.module';
import {ShareModule} from '../../share-module/share.module';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {FeedbackComponent} from "./feedback.component";
import {FeedbackCreateComponent} from "./feedback-create/feedback-create.component";
import {MatFormFieldModule} from "@angular/material/form-field";



@NgModule({
  declarations: [FeedbackCreateComponent, FeedbackComponent],
    imports: [
        CommonModule,
        FeedbackRoutingModule,
        ShareModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
        MatFormFieldModule,
    ]
})
export class FeedbackModule { }
