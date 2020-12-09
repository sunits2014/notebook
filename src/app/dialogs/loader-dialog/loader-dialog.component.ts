import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogsComponent } from '../dialogsIndex';

@Component({
  selector: 'app-loader-dialog',
  templateUrl: './loader-dialog.component.html',
  styleUrls: ['./loader-dialog.component.css']
})
export class LoaderDialogComponent implements OnInit {

  @Input() data: any;

  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();

  public dialogHeader: string;
  public dialogContent: any;
  public iconShape: any;
  public iconClass: any;

  constructor(private dialogRef: MatDialogRef<DialogsComponent>) {
  }

  public ngOnInit() {
    this.dialogHeader = this.data.header;
    this.dialogContent = this.data.body;
    this.iconShape = this.data.iconShape;
    this.iconClass = this.data.iconClass;
  }

  public publishConfirmation(confirmation: string) {
    this.buttonClicked.emit({ component: 'Info', emitValue: confirmation });
  }
}
