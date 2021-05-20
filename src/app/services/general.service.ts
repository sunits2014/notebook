import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public userLoggedInListener: Subject<any> = new Subject();
  public coursesUpdated: Subject<boolean> = new Subject();

  constructor(private firebase: FirebaseApp) { }

  public async checkCurrentUser() {
    return new Promise((resolve, reject) => {
      this.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      })
    })
  }

  public broadcastUserLoggedInStatus(value: boolean) {
    this.userLoggedInListener.next(value);
  }

  public broadcastCoursesUpdated(boolValue: boolean) {
    this.coursesUpdated.next(boolValue);
  }
}
