import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RoutesRecognized, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from './services/general.service';
import { PicUploadService } from './services/pic-upload.service';
import { PublishSubscribeService } from './services/publish-subscribe.service';
import { UtilitiesService } from './services/utilities.service';
import { WelcomeService } from './services/welcome.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PicUploadService]
})
export class AppComponent implements OnInit, OnDestroy {

  public title: any;
  public pageNotLoaded: boolean;
  public profilePhoto: any;
  public logoUrl: any;
  public loginRoute: boolean;
  public isUSerSignedIn: any;

  private subscriptions: Array<Subscription>;

  constructor(
    private titleService: Title,
    public router: Router,
    public activeRoute: ActivatedRoute,
    private publishSubscribe: PublishSubscribeService,
    private picUploadService: PicUploadService,
    private generalService: GeneralService) {
    this.pageNotLoaded = true;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.pageNotLoaded = true;
      }
      if (event instanceof NavigationEnd) {
        this.title = this.activeRoute.root.firstChild.snapshot.firstChild.data.title || this.activeRoute.root.firstChild.snapshot.firstChild.firstChild.data.title;
        if (this.activeRoute.root.firstChild.snapshot.firstChild) {
          if (!this.activeRoute.root.firstChild.snapshot.firstChild.firstChild) {
            this.setTitle(this.activeRoute.root.firstChild.snapshot.firstChild.data.title);
            this.logoUrl = this.activeRoute.snapshot.firstChild.firstChild.data.images.mainLogo;
            this.profilePhoto = this.activeRoute.snapshot.firstChild.firstChild.data.images.user.photoUrl;
          } else {
            if (this.activeRoute.root.firstChild.snapshot.firstChild.firstChild.data.images.isUserSignedIn) {
              if (this.router.url === '/' || this.router.url === '/authenticate' || this.router.url === '/authenticate/signup' || this.router.url === '/authenticate/reset-password') {
                this.router.navigate(['home']);
              }
            }
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
    }));
    this.subscriptions.push(this.picUploadService.userDataListener.subscribe(userData => {
      if (userData) {
        this.profilePhoto = userData.user.photoUrl;

      }
    }));
    this.subscriptions.push(this.generalService.userLoggedInListener.subscribe(response => {
      this.isUSerSignedIn = response;
      if (!response) {
        this.router.navigate(['']);
      }
    }));
  }

  public ngOnInit() {
    this.setTitle();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  private setTitle(pageTitle?: string) {
    this.titleService.setTitle('The Notebook' + (pageTitle || ''));
  }

}
