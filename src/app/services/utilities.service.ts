import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { BasicSnackbarComponent } from '../snackbar-components/basic/basic-snackbar/basic-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  public horizontalPosition: MatSnackBarHorizontalPosition;
  public verticalPosition: MatSnackBarVerticalPosition;
  

  constructor(private snackBar: MatSnackBar) { 
    this.horizontalPosition = 'end';
    this.verticalPosition = 'top';
  }

  public showBasicSnackBar(message: Object, panelClass?: string) {
    this.snackBar.openFromComponent(BasicSnackbarComponent, {
      data: message,
      duration: 4000,
      panelClass: [panelClass],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
