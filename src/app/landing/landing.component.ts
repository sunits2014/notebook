import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service';
import { WelcomeService } from '../services/welcome.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public logoURL: any;
  public menuItems: Array<Object>;
  public profilePhoto: any;

  constructor(private activeRoute: ActivatedRoute, private welcomeService: WelcomeService, private router: Router, private utilities: UtilitiesService) { 
    this.logoURL = this.activeRoute.snapshot.data.images.mainLogo;
    this.profilePhoto = this.activeRoute.snapshot.data.images.profilePhoto;
    this.menuItems = [
      {
        title: 'Home',
        link: 'home',
        icon: 'home'
      },
      {
        title: 'Courses',
        link: 'courses',
        icon: 'local_library'
      },
      {
        title: 'Students',
        link: 'students',
        icon: 'people'
      },
      {
        title: 'Q & A Forum',
        link: 'forum',
        icon: 'forum'
      },
      {
        title: 'Contact',
        link: 'contact',
        icon: 'perm_phone_msg'
      }
    ];
  }

  ngOnInit(): void {
  }

  public onActivate(event) {
    return event.activeRoute.data.next({user: this.activeRoute.snapshot.data.images.user});
  }

  public signOut() {
    const responseObj = {
      title: '',
      message: ''
    }
    this.welcomeService.signOut().then(response => {
      responseObj.title = 'Alert';
      responseObj.message = 'You have been signed out successfully.'
      this.utilities.showBasicSnackBar(responseObj, 'success-in-snackBar');
      this.router.navigate(['']);
    })
  }
}
