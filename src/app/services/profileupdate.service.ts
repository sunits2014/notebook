import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {

  private db: any;

  constructor(private firebase: FirebaseApp, private httpClient: HttpClient) {
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
                "address.address1": userObj.address.address1,
                "address.address2": userObj.address.address2,
                "address.pincode": userObj.address.pincode,
                "address.city": userObj.address.city,
                "address.state": userObj.address.state,
                "address.country": userObj.address.country,
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

  public fetchLocationDetails(pincode: number): Observable<any> {
    const url = 'http://postalpincode.in/api/pincode/' + pincode;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.get(url, httpOptions);
  }
}
