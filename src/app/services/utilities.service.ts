import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { DialogsComponent } from '../dialogs/dialogsIndex';
import { BasicSnackbarComponent } from '../snackbar-components/basic/basic-snackbar/basic-snackbar.component';
import { IToast, IDialogParam } from '../interfaces/interfacesIndex';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  public horizontalPosition: MatSnackBarHorizontalPosition;
  public verticalPosition: MatSnackBarVerticalPosition;

  public toaster: IToast;

  public dialogRef: MatDialogRef<DialogsComponent>;
  public dialogConfig = new MatDialogConfig();

  public dialogParams: IDialogParam;


  constructor(private snackBar: MatSnackBar, public dialog?: MatDialog) {
    this.horizontalPosition = 'end';
    this.verticalPosition = 'top';
    this.toaster = {} as IToast;
    this.dialogParams = {} as IDialogParam;
  }

  public showBasicSnackBar(panelClass?: string) {
    this.snackBar.openFromComponent(BasicSnackbarComponent, {
      data: this.toaster,
      duration: 4000,
      panelClass: [panelClass],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  public showLoaderDialog() {
    this.dialogConfig.data = {
      header: this.dialogParams.header,
      body: this.dialogParams.body,
      component: 'LoaderComponent',
      disableClose: true
    };
    this.dialogConfig.disableClose = true;
    this.dialogRef = this.dialog.open(DialogsComponent, this.dialogConfig);
  }

  public showBasicInfoDialog() {
    this.dialogConfig.data = {
      header: this.dialogParams.header,
      body: this.dialogParams.body,
      component: 'BasicComponent'
    };
    this.dialogConfig.disableClose = true;
    this.dialogRef = this.dialog.open(DialogsComponent, this.dialogConfig);
  }

  public closeAllDialogs() {
    this.dialog.closeAll();
  }
}
