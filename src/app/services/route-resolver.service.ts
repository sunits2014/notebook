import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { IResolvedData } from '../interfaces/resolved-data';
import { GeneralService } from './general.service';
import { PublishSubscribeService } from './publish-subscribe.service';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService {

  public resolvedData: IResolvedData;

  private db: any;

  constructor(
    private fireStorage: AngularFireStorage,
    private publishSubscribe: PublishSubscribeService,
    private firebase: FirebaseApp,
    private generalService: GeneralService) {
    this.db = this.firebase.firestore();
    this.resolvedData = {} as IResolvedData;
  }

  resolve(): Promise<any> {
    return this.resolveData();
  }

  async resolveData() {
    let userData: any;
    let isUserLoggedIn = false;
    userData = await this.getUserData();
    (typeof userData === 'object') ? isUserLoggedIn = true : false;
    if (isUserLoggedIn) {
      this.resolvedData = {
        loginLogo: await this.getLoginLogo(),
        registerLogo: await this.getRegisterLogo(),
        mainLogo: await this.getMainLogo(),
        user: userData,
        isUserSignedIn: isUserLoggedIn
      }
      this.publishSubscribe.broadcastLoaderStatus(false);
      return this.resolvedData;
    } else {
      this.resolvedData = {
        loginLogo: await this.getLoginLogo(),
        registerLogo: await this.getRegisterLogo(),
        mainLogo: await this.getMainLogo(),
        user: {},
        isUserSignedIn: false
      };
      this.publishSubscribe.broadcastLoaderStatus(false);
      return this.resolvedData;
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
        return resolve(data);
      })
    })
  }

  private getUserData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.generalService.broadcastUserLoggedInStatus(true);
          const docRef = this.db.collection("users").doc(user.uid);
          docRef.get().then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              this.getProfilePic(userData.photoUrl).then(response => {
                userData.photoUrl = response;
                return resolve(userData);
              });
            }
          }).catch(function (error) {
            console.log("Error getting document:", error);
          });
        } else {
          return resolve('No data found');
        }
      });
    })
  }

  private async getProfilePic(photUrl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fireStorage.refFromURL(photUrl).getDownloadURL().subscribe(data => {
        return resolve(data);
      })
    })
  }
}
