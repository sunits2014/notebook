import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { PublishSubscribeService } from '../services/publish-subscribe.service';
import { UtilitiesService } from '../services/utilities.service';
import { WelcomeService } from '../services/welcome.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  @Input() public logoUrl: any;
  @Input() public profilePhoto: any;

  public menuItems: Array<any>;

  constructor(
    private welcomeService: WelcomeService,
    private utilities: UtilitiesService,
    private router: Router,
    private publishSubscribe: PublishSubscribeService) {
    this.menuItems = [];
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
      this.utilities.toaster.title = 'Alert';
      this.utilities.toaster.message = 'You have been signed out successfully.'
      this.utilities.showBasicSnackBar('success-in-snackBar');
    })
  }

}
