import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogsComponent } from '../dialogs.component';
import { ICourses } from '../../interfaces/courses';
import { ProfileUpdateService } from 'src/app/services/profileupdate.service';
import { GeneralService } from 'src/app/services/general.service';

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
  public mandatoryCourses: Array<any>;
  public electiveCourses: Array<any>;
  public milCourses: Array<any>;
  public mainCourses: Array<any>;

  private courses: ICourses;

  constructor(
    private dialogRef: MatDialogRef<DialogsComponent>, 
    private profileUpdateService: ProfileUpdateService, 
    private generalService: GeneralService) {
    this.mandatoryCourses = [];
    this.electiveCourses = [];
    this.milCourses = [];
    this.mainCourses = [];
    this.courses = {} as ICourses;
    this.courses.compulsory = [];
  }

  public ngOnInit() {
    this.dialogHeader = this.data.header;
    this.dialogContent = this.data.body;
    this.iconShape = this.data.iconShape;
    this.iconClass = this.data.iconClass;
    this.mainCourses = this.data.courses;
    this.segregateCOurses(this.data.courses);
  }

  public publishConfirmation(confirmation: string) {
    this.buttonClicked.emit({ component: 'Info', emitValue: confirmation });
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public selectMainCourse(course) {
    return course.selected = !course.selected;
  }

  public selectElectiveCourse(course) {
    this.electiveCourses.forEach(course => {
      course.selected = false;
    })
    course.selected = true;
  }

  public selectMilCourse(course) {
    this.milCourses.forEach(course => {
      course.selected = false;
    })
    course.selected = true;
  }

  public enrollCourses() {
    const mil = this.milCourses.find(item => {return item.selected});
    const elective = this.electiveCourses.find(item => {return item.selected});
    this.mainCourses.find(item => {
      if (mil.name === item) {
        return this.courses.mil = item;
      }
    });
    this.mainCourses.find(item => {
      if (elective.name === item) {
        return this.courses.elective = item
      }
    })
    this.mandatoryCourses.forEach(item => {
      if (item.selected) {
        return this.courses.compulsory.push(item.name); 
      }
    });
    this.profileUpdateService.updateCourses(this.courses).then(response => {
      this.closeDialog();
      this.generalService.broadcastCoursesUpdated(true);
    })
  }

  private segregateCOurses(courses) {
    courses.forEach(course => {
      if (course === 'Advance Mathematics' || course === 'Geography' || course === 'Computer Science') {
        this.electiveCourses.push({name: course});
      } else if (course === 'Hindi' || course === 'English 3') {
        this.milCourses.push({name: course});
      } else {
        this.mandatoryCourses.push({name: course});
      }
    })
  }
}
