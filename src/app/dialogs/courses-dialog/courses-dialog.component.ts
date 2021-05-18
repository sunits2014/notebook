import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogsComponent } from '../dialogs.component';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.css']
})
export class CoursesDialogComponent implements OnInit {

  @Input() data: any;

  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();

  public dialogHeader: string;
  public dialogContent: any;
  public iconShape: any;
  public iconClass: any;
  public mandatoryCourses: Array<string>;
  public electiveCourses: Array<string>;
  public milCourses: Array<string>;

  constructor(private dialogRef: MatDialogRef<DialogsComponent>) {
    this.mandatoryCourses = [];
    this.electiveCourses = [];
    this.milCourses = [];
  }

  public ngOnInit() {
    this.dialogHeader = this.data.header;
    this.dialogContent = this.data.body;
    this.iconShape = this.data.iconShape;
    this.iconClass = this.data.iconClass;
    this.segregateCOurses(this.data.courses);
  }

  public publishConfirmation(confirmation: string) {
    this.buttonClicked.emit({ component: 'Info', emitValue: confirmation });
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  private segregateCOurses(courses) {
    courses.forEach(course => {
      if (course === 'advance maths' || course === 'geography' || course === 'computer science') {
        this.electiveCourses.push(course);
      } else if (course === 'hindi' || course === 'english 3') {
        this.milCourses.push(course);
      } else {
        this.mandatoryCourses.push(course);
      }
    })
  }
}
