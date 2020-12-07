import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

  constructor(private firebase: FirebaseApp, private router: Router) { }

  public canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return resolve(true);
        } else {
          this.router.navigate(['']);
        }
      });
    })
  }
}
