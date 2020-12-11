import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../interfaces/interfacesIndex';
import { PicUploadService } from '../services/pic-upload.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {

  public user: IUser;

  constructor(private activeRoute: ActivatedRoute, private picUploadService: PicUploadService, private utilitiesService: UtilitiesService) {
    this.user = {} as IUser;
    this.activeRoute.data.subscribe(data => {
      if (data.images.user) {
        this.user = data.images.user;
      }
    });
    this.picUploadService.userDataListener.subscribe(userData => {
      this.user = userData.user;
    })
  }

  ngOnInit(): void {
  }

  public uploadPic(event) {

    this.picUploadService.uploadProfilePic(event.target.files).then(response => {
      this.utilitiesService.closeAllDialogs();
    }).catch(error => {
      this.utilitiesService.toaster.title = 'Error';
      this.utilitiesService.toaster.message = error;
      this.utilitiesService.showBasicSnackBar('error-in-snackBar');
    })
  }
}
