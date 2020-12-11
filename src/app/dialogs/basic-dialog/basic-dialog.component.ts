import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogsComponent } from '../dialogsIndex';

@Component({
  selector: 'app-basic-dialog',
  templateUrl: './basic-dialog.component.html',
  styleUrls: ['./basic-dialog.component.css']
})
export class BasicDialogComponent implements OnInit {

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

  public publishConfirmation() {
    this.dialogRef.close();
  }

}
