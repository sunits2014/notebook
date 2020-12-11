import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { UtilitiesService } from '../services/utilities.service';
import { WelcomeService } from '../services/welcome.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  public menuItems: Array<any>;
  public logoUrl: any;
  public profilePhoto: any;

  constructor(
    private welcomeService: WelcomeService,
    private utilities: UtilitiesService,
    private router: Router,
    private generalService: GeneralService,
    private activeRoute: ActivatedRoute) {
    this.menuItems = [];
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.logoUrl = this.activeRoute.firstChild.firstChild.data['value'].images.mainLogo;
        this.profilePhoto = this.activeRoute.firstChild.firstChild.data['value'].images.user.photoUrl;
      }
    })
  }

  ngOnInit(): void {
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

  public signOut() {
    this.welcomeService.signOut().then(response => {
      this.generalService.broadcastUserLoggedInStatus(false);
      this.utilities.toaster.title = 'Alert';
      this.utilities.toaster.message = 'You have been signed out successfully.'
      this.utilities.showBasicSnackBar('success-in-snackBar');
    })
  }

}
