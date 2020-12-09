import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { IUser } from '../interfaces/user';
import { UtilitiesService } from '../services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class PicUploadService {

  public userDataListener = new Subject<any>();

  private task: AngularFireUploadTask;
  private db: any;

  //File details  
  public fileName: string;
  public fileSize: number;

  // Progress in percentage
  public percentage: Observable<number>;

  // Snapshot of uploading file
  public snapshot: Observable<any>;

  constructor(
    private firebase: FirebaseApp,
    private storage: AngularFireStorage,
    private database: AngularFirestore,
    private utilitiesService: UtilitiesService,
    private activeRoute: ActivatedRoute) {
    this.db = this.firebase.firestore();
  }

  public uploadProfilePic(fileObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // The File object
      const file = fileObj[0]

      // Validation for Images Only
      if (file.type.split('/')[0] !== 'image') {
        return reject('Unsupported file type. Please select a JPEG or PNG file.');
      } else if (file.size > 1000000) {
        return reject('Image file too big. Please choose a smaller image file.');
      } else {

        // get image dimensions
        const URL = window.URL || window.webkitURL;
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = (e: any) => {
          const imageHeight = e.path[0].height;
          const imageWidth = e.path[0].width;
          if (imageHeight === imageWidth) {

            this.utilitiesService.dialogParams.body = 'Upload in progress, please wait...';
            this.utilitiesService.dialogParams.header = 'Picture Upload';
            this.utilitiesService.showLoaderDialog();

            this.fileName = file.name;

            // The storage path
            const path = `profileImages/${file.name}`;

            // Totally optional metadata
            const customMetadata = { app: 'Test Image Upload Demo' };

            //File reference
            const fileRef = this.storage.ref(path);

            // The main task
            this.task = this.storage.upload(path, file, { customMetadata });
            // this.task = this.storage.ref(path).put(path);

            // Get file progress percentage
            this.percentage = this.task.percentageChanges();
            this.task.snapshotChanges().pipe(
              finalize(() => {
                // Get uploaded file storage path
                fileRef.getDownloadURL().subscribe(imageURL => {
                  // getting current signed in user details
                  this.firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                      const docRef = this.db.collection("users").doc(user.uid);
                      docRef.get().then((doc) => {
                        // updating current user profile
                        if (doc.exists) {
                          const user = this.firebase.auth().currentUser;
                          user.updateProfile({
                            photoURL: imageURL
                          }).then(response => {
                            this.database.collection('users').doc(user.uid).update({ photoUrl: imageURL }).then(response => {
                              const docRef = this.db.collection("users").doc(user.uid);
                              docRef.get().then((doc) => {
                                if (doc.exists) {
                                  const userData = doc.data();
                                  this.activeRoute.snapshot.firstChild.firstChild.data.images.user = userData;
                                  this.userDataListener.next({ user: userData })
                                  this.utilitiesService.toaster.title = 'Info';
                                  this.utilitiesService.toaster.message = 'Profile picture uploaded successfully.';
                                  this.utilitiesService.showBasicSnackBar('success-in-snackBar');
                                  return resolve('');
                                }
                              });
                            }).catch(error => {
                              return reject(error.message);
                            })
                          }).catch(error => {
                            this.utilitiesService.toaster.title = 'Error';
                            this.utilitiesService.toaster.message = error.message;
                            this.utilitiesService.showBasicSnackBar('error-in-snackBar');
                          });
                        }
                      }).catch(function (error) {
                        console.log("Error getting document:", error);
                      });
                    } else {
                      return resolve('No data found');
                    }
                  });

                }, error => {
                  console.error(error);
                })
              }),
              tap(snap => {
                this.fileSize = snap.totalBytes;
              })
            ).subscribe();
          } else if (imageHeight !== imageWidth) {
            return reject('Image width is not same as height. Please upload a picture with equal width and height.')
          }
        }
      }
    })
  }
}
