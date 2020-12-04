import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublishSubscribeService {

  public loaderObservable: Subject<boolean> = new Subject();

  constructor() { }

  public broadcastLoaderStatus(status: boolean) {
    this.loaderObservable.next(status);
  }
}
