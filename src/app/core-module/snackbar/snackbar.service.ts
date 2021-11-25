import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarComponent} from '../../share-module/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {
  }

  showSnackbar(message: string, status: 'error' | 'success'){
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        status: status == 'error' ? 'Error' : 'Success'
      },
      duration: 2000,
      panelClass: status,
      verticalPosition: "top"
    })
  }
}
