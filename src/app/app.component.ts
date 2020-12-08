import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';
import { PublishSubscribeService } from './services/publish-subscribe.service';
import { UtilitiesService } from './services/utilities.service';
import { WelcomeService } from './services/welcome.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public title: any;
  public pageNotLoaded: boolean;
  public profilePhoto: any;
  public menuItems: Array<any>;
  public logoURL: any;

  private subscriptions: Array<Subscription>;

  constructor(
    private titleService: Title, 
    public router: Router, 
    private activeRoute: ActivatedRoute, 
    private publishSubscribe: PublishSubscribeService,
    private welcomeService: WelcomeService,
    private utilities: UtilitiesService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      this.title = this.activeRoute.root.firstChild.snapshot.firstChild.data.title || this.activeRoute.root.firstChild.snapshot.firstChild.firstChild.data.title;
        if (this.activeRoute.root.firstChild.snapshot.firstChild) {
          if (!this.activeRoute.root.firstChild.snapshot.firstChild.firstChild) {
            this.setTitle(this.activeRoute.root.firstChild.snapshot.firstChild.data.title);
            this.logoURL = this.activeRoute.snapshot.firstChild.firstChild.data.images.mainLogo;
            this.profilePhoto = this.activeRoute.snapshot.firstChild.firstChild.data.images.user.photoUrl;
          } else {
            this.setTitle(this.activeRoute.root.firstChild.snapshot.firstChild.firstChild.data.title);
          }
        } else {
          this.setTitle("");
        }
      }
    });
    this.subscriptions = [];
    this.subscriptions.push(this.publishSubscribe.loaderObservable.subscribe(status => {
      this.pageNotLoaded = status;
    }))
  }

  public ngOnInit () {
    this.setTitle();
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

  public ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
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
      setTimeout(() => {
        this.router.navigate(['']);
      }, 4000)
    })
  }

  private setTitle(pageTitle?: string) {
    this.titleService.setTitle('The Notebook' + (pageTitle || ''));
  }
  
}
