import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';
import { PublishSubscribeService } from './services/publish-subscribe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public pageNotLoaded: boolean;

  private subscriptions: Array<Subscription>;

  constructor(private titleService: Title, private router: Router, private activeRoute: ActivatedRoute, private publishSubscribe: PublishSubscribeService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.activeRoute.root.firstChild.snapshot.firstChild) {
          if (!this.activeRoute.root.firstChild.snapshot.firstChild.firstChild) {
            this.setTitle(this.activeRoute.root.firstChild.snapshot.firstChild.data.title);
          } else {
            this.setTitle(this.activeRoute.root.firstChild.snapshot.firstChild.firstChild.data.title);
          }
        } else {
          this.setTitle("");
        }
      }
    });
    this.pageNotLoaded = true;
    this.subscriptions = [];
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        if (event.urlAfterRedirects.includes('authenticate') || event.urlAfterRedirects === '/main') {
          this.pageNotLoaded = true;
        }
      }
    })
    this.subscriptions.push(this.publishSubscribe.loaderObservable.subscribe(status => {
      this.pageNotLoaded = status;
    }))
  }

  public ngOnInit () {
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
