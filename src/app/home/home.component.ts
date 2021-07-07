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

  private coursesCollection: Array<any>;
  private colors: Array<string>

  constructor(private activeRoute: ActivatedRoute, private utilitiesService: UtilitiesService, private generalService: GeneralService) {
    this.user = {} as IUser;
    this.user = this.activeRoute.snapshot.data.images.user;
    this.courses = [];
    this.userEnrolledCourses = [];
    this.generalService.coursesUpdated.subscribe(data => {
      this.dataLoading = true;
    });
    this.coursesCollection = [];
    this.colors = [
      "#ff1493",
      "#fc1cad",
      "#c1fd33",
      "#f69e94",
      "#2b8a6d",
      "#fec42e",
    ];
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
    this.activeRoute.snapshot.data.images.user.enrolledCourses.length > 0 ? this.coursesCollection = this.activeRoute.snapshot.data.images.user.enrolledCourses : this.coursesCollection = [];
    this.dataLoading = false;
    if (this.coursesCollection.length > 0) {
      this.coursesCollection.forEach(item => {
        this.userEnrolledCourses.push({
          name: item,
          header: item.match(/\b(\w)/g).join(''),
          color: this.colors[Math.floor(Math.random() * this.colors.length)]
        })
      })
    }
  }

}
