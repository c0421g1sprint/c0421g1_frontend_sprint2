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
import {DialogDeleteComponent} from "./dialog-delete/dialog-delete.component";



@NgModule({
  declarations: [
    SnackbarComponent,
    HeaderComponent,
    FooterComponent,
    DialogDeleteComponent
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
  ],
  exports: [
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
  ],
})
export class ShareModule { }
