import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpClientModule} from '@angular/common/http';
import { ShareModule } from './share-module/share.module';
import { AccountComponent } from './feature-module/account/account.component';
import { EmployeeComponent } from './feature-module/employee/employee.component';
import { FeedbackComponent } from './feature-module/feedback/feedback.component';
import { FoodAndDrinkComponent } from './feature-module/food-and-drink/food-and-drink.component';
import { OrderComponent } from './feature-module/order/order.component';
import { TableComponent } from './feature-module/table/table.component';
import { FeatureModule } from './feature-module/feature.module';
import { AppRoutingModule } from './app-routing.module';
import {TableModule} from "./feature-module/table/table.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ShareModule,
    FeatureModule,
    AppRoutingModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
