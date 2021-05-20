import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICourses } from '../interfaces/courses';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {

  private db: any;
  private user: IUser;

  constructor(private firebase: FirebaseApp, private httpClient: HttpClient, private firestore: AngularFirestore) {
    this.db = this.firebase.firestore();
  }

  public updateUserProfile(userObj: IUser): Promise<string> {
    this.user = userObj;
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
    const url = 'https://app.zipcodebase.com/api/v1/search?apikey=83d6da00-6f81-11eb-af69-29ea71d5d4a0&codes=' + pincode;
    // const url = "https://api.postalpincode.in/pincode/" + pincode;
    return this.httpClient.get(url);
  }

  public updateCourses(courses: ICourses) {
    return new Promise((resolve, reject) => {
      this.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.firestore.collection("courses").get().subscribe(data => {
            let coursesdata = [];
            let counter = 0;
            courses.compulsory.forEach(course => {
              coursesdata.push(course);
              counter++;
              this.firestore.collection("courses").doc(course).set({
                "user": user.uid
              }).then(response => {
                
              }).catch(error => {
                return reject(error);
              })
            });
            if (counter === courses.compulsory.length) {
              coursesdata.push(courses.mil);
              coursesdata.push(courses.elective);
              this.firestore.collection("courses").doc(courses.mil).set({
                "user": user.uid
              }).then(response => {
                this.firestore.collection("courses").doc(courses.elective).set({
                  "user": user.uid
                }).then(response => {
                  this.firestore.collection("users").doc(user.uid).update({
                    "enrolledCourses": Array.from(new Set(coursesdata))
                  }).then(response => {
                    return resolve('All done');
                  }).catch(error => {
                    return reject(error);
                  })
                }).catch(error => {
                  return reject(error);
                })
              }).catch(error => {
                return reject(error);
              })
            }            
          })
        }
      })
    })
  }
}
