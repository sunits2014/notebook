import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { forkJoin } from 'rxjs';
import { PublishSubscribeService } from './publish-subscribe.service';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService {

  public resolvedData = {};

  constructor(private fireStorage: AngularFireStorage, private publishSubscribe: PublishSubscribeService) {
  } 

  resolve (): Promise<any> {
    return this.resolveData();
  }

  async resolveData() {
    return this.resolvedData = {
      loginLogo: await this.getLoginLogo(),
      registerLogo: await this.getRegisterLogo(),
      mainLogo: await this.getMainLogo()
    }
  }

  private async getLoginLogo() {
    return new Promise((resolve, reject) => {
      this.fireStorage.refFromURL('gs://thenotebook-ba7cd.appspot.com/logo_full.png').getDownloadURL().subscribe(data => {
        return resolve(data);
      })
    }) 
  }

  private async getRegisterLogo() {
    return new Promise((resolve, reject) => {
      this.fireStorage.refFromURL('gs://thenotebook-ba7cd.appspot.com/logo.png').getDownloadURL().subscribe(data => {
        return resolve(data);
      })
    })
  }

  private async getMainLogo() {
    return new Promise((resolve, reject) => {
      this.fireStorage.refFromURL('gs://thenotebook-ba7cd.appspot.com/name_logo.png').getDownloadURL().subscribe(data => {
        this.publishSubscribe.broadcastLoaderStatus(false);
        return resolve(data);
      })
    })
  }
}
