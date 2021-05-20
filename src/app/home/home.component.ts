import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../interfaces/user';
import { GeneralService } from '../services/general.service';
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
  public dataLoading: boolean;

  public inPageLoader: boolean;

  constructor(private activeRoute: ActivatedRoute, private utilitiesService: UtilitiesService, private generalService: GeneralService) {
    this.user = {} as IUser;
    this.user = this.activeRoute.snapshot.data.images.user;
    this.courses = [];
    this.userEnrolledCourses = [];
    this.generalService.coursesUpdated.subscribe(data => {
      this.dataLoading = true;
    })
   }

  ngOnInit(): void {
    this.dataLoading = true;
    this.courses = this.activeRoute.snapshot.data.images.coursesCollection;
    this.populateUserEnrolledCourses();
  }

  public showCourses() {
    this.utilitiesService.dialogParams.header = 'Available Courses';
    this.utilitiesService.dialogParams.body = 'Please choose courses from the list below';
    this.utilitiesService.showCoursesEnrollmentDialog(this.courses);
  }

  private populateUserEnrolledCourses() {
    this.activeRoute.snapshot.data.images.user.enrolledCourses.length > 0 ? this.userEnrolledCourses = this.activeRoute.snapshot.data.images.user.enrolledCourses : this.userEnrolledCourses = [];
    this.dataLoading = false;
  }

}
