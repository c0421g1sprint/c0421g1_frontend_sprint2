import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { ShareModule } from './share-module/share.module';
import { FeatureModule } from './feature-module/feature.module';
import { AppRoutingModule } from './app-routing.module';
import {registerLocaleData} from "@angular/common";
import localeVi from '@angular/common/locales/vi'
import {OrderModule} from "./feature-module/order/order.module";

import {FoodAndDrinkModule} from "./feature-module/food-and-drink/food-and-drink.module";
import {CategoryModule} from "./feature-module/category/category.module";

registerLocaleData(localeVi, "vi-VN");
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ShareModule,
    FeatureModule,
    AppRoutingModule,
    FoodAndDrinkModule,
    CategoryModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
