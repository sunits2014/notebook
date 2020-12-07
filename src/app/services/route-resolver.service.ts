import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { isObject } from 'util';
import { PublishSubscribeService } from './publish-subscribe.service';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService {

  public resolvedData = {};

  private db: any;

  constructor(
    private fireStorage: AngularFireStorage, 
    private publishSubscribe: PublishSubscribeService, 
    private firebase: FirebaseApp) {
      this.db = this.firebase.firestore();
  } 

  resolve (): Promise<any> {
    return this.resolveData();
  }

  async resolveData() {
    let userData: any;
    let isUserLoggedIn = false;
    userData = await this.getUserData();
    (typeof userData === 'object') ? isUserLoggedIn = true : false;
    return this.resolvedData = {
      loginLogo: await this.getLoginLogo(),
      registerLogo: await this.getRegisterLogo(),
      mainLogo: await this.getMainLogo(),
      user: userData,
      isUserSignedIn: isUserLoggedIn
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

  private getUserData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return resolve(user);
        } else {
          return resolve('No data found');
        }
      });
    })   
  }
}
