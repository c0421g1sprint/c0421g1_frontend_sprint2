import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatVideoModule} from "mat-video";
import {DialogDeleteComponent} from "./dialog-delete/dialog-delete.component";
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {environment} from "../../environments/environment";
import {Page403Component} from "./page403/page403.component";
import {ShareRoutingModule} from "./share-routing.module";
import { Page404NotfoundComponent } from './page404-notfound/page404-notfound.component';

@NgModule({
  declarations: [
    SnackbarComponent,
    HeaderComponent,
    FooterComponent,
    DialogDeleteComponent,
    Page403Component,
    Page404NotfoundComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatVideoModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ShareRoutingModule
  ],
  exports: [
    Page403Component,
    DialogDeleteComponent,
    SnackbarComponent,
    FooterComponent,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatVideoModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ShareRoutingModule
  ],
})
export class ShareModule { }
