import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../interfaces/user';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: IUser;
  public courses: Array<any>;
  public userEnrolledCourses: Array<any>;

  constructor(private activeRoute: ActivatedRoute, private utilitiesService: UtilitiesService) {
    this.user = {} as IUser;
    this.user = this.activeRoute.snapshot.data.images.user;
    this.courses = [];
    this.userEnrolledCourses = [];
   }

  ngOnInit(): void {
    this.courses = this.activeRoute.snapshot.data.images.coursesCollection;
    this.populateUserEnrolledCourses();
  }

  public showCourses() {
    let courses = [];
    this.courses.forEach(course => {
      if (course.includes('_')) {
        courses.push(course.split('_').join(' '));
      } else {
        courses.push(course);
      }
    })
    this.utilitiesService.dialogParams.header = 'Available Courses';
    this.utilitiesService.dialogParams.body = 'Please choose courses from the list below';
    this.utilitiesService.showCoursesEnrollmentDialog(courses);
  }

  private populateUserEnrolledCourses() {
    this.activeRoute.snapshot.data.images.user.length > 0 ? this.userEnrolledCourses = this.activeRoute.snapshot.data.images.user.enrolledCourses : this.userEnrolledCourses = [];
  }

}
