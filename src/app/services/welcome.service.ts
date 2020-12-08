import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseApp } from '@angular/fire';
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private firebase: FirebaseApp, private fireStore: AngularFirestore) { }

  public async registerUser(userObj) {
    return await this.firebase.auth().createUserWithEmailAndPassword(userObj.emailAddress.value, userObj.password.value).then(async result => {
      return await this.firebase.firestore().collection('users').doc(this.firebase.auth().currentUser.uid).
        set({
          name: userObj.fullName.value,
          email: userObj.emailAddress.value,
          password: userObj.password.value,
          photoUrl: 'gs://thenotebook-ba7cd.appspot.com/user.svg',
          address: [],
          friends: [],
          enrolledCourses: [],
          phone: userObj.telephone.value
        }).then(response => {
          result.user.updateProfile({
            displayName: userObj.fullName.value.split(' ')[0]
          });
          return 'User registered successfully!';
        }).catch(error => {
          return error
        });
    }).catch(error => {
      return error
    })
  }

  public async userLogin(userObj) {
    return await this.firebase.auth().signInWithEmailAndPassword(userObj.emailAddress.value, userObj.password.value)
    .then((user) => {
      return 'Logged in successfully!';
    })
    .catch((error) => {
      return error;
    });
  }

  public async resetPassword(userObj) {
    return await this.firebase.auth().sendPasswordResetEmail(userObj.emailAddress.value).then(response => {
      return 'Email sent successfully. Please check your email.';
    }).catch(function(error) {
      return error;
    });
  }

  public async signOut() {
    return await this.firebase.auth().signOut().then(response => {
      return response;
    }).catch(function(error) {
      return error;
    });
  }
}
