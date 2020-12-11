import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {

  private db: any;

  constructor(private firebase: FirebaseApp) {
    this.db = this.firebase.firestore();
  }

  public updateUserProfile(userObj: IUser): Promise<string> {
    return new Promise((resolve, reject) => {
      this.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const docRef = this.db.collection("users").doc(user.uid);
          docRef.get().then((doc) => {
            if (doc.exists) {
              const user = this.firebase.auth().currentUser;
              docRef.update({
                "name": userObj.name,
                "email": userObj.email,
                "phone": userObj.phone,
                "address.main": userObj.address.main,
                "address.city": userObj.address.city,
                "address.state": userObj.address.state,
                "address.postal": userObj.address.postal,
              }).then(response => {
                return resolve('Profile updated successfully.');
              }).catch(error => {
                return reject(error.message);
              })
            }
          })
        }
      })
    })
  }
}
