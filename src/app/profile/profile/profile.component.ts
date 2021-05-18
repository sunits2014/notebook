import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { ProfileUpdateService } from 'src/app/services/profileupdate.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: IUser;
  public profileForm: FormGroup;
  public address: FormGroup;
  public profilePhoto: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileUpdateService: ProfileUpdateService,
    private utilitiesService: UtilitiesService) {
    this.user = {} as IUser;
    this.activeRoute.data.subscribe(value => {
      this.user = value.images.user;
    });
    this.address = this.formBuilder.group({
      address1: new FormControl(this.user.address.address1),
      address2: new FormControl(this.user.address.address2),
      pincode: new FormControl(this.user.address.pincode),
      city: new FormControl({ value: this.user.address.city, disabled: true }),
      state: new FormControl({ value: this.user.address.state, disabled: true }),
      country: new FormControl({ value: this.user.address.country, disabled: true })
    })
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.user.phone, [Validators.required]),
      address: this.address
    })
  }

  public updateProfile() {
    this.utilitiesService.dialogParams.header = '';
    this.utilitiesService.dialogParams.body = 'Profile update in progress, please wait...';
    this.utilitiesService.showLoaderDialog();
    this.profileForm.controls['address'].enable();
    this.profileUpdateService.updateUserProfile(this.profileForm.value).then(response => {
      this.address.controls['city'].disable();
      this.address.controls['state'].disable();
      this.address.controls['country'].disable();
      this.utilitiesService.closeAllDialogs();
      this.utilitiesService.dialogParams.header = 'Info';
      this.utilitiesService.dialogParams.body = 'Profile updated successfully.'
      this.utilitiesService.showBasicInfoDialog();
    }).catch(error => {
      this.utilitiesService.toaster.title = 'Error';
      this.utilitiesService.toaster.message = error.message;
      this.utilitiesService.showBasicSnackBar('error-in-snackBar');
    })
  }

  public lookUpLocation() {
    if (this.address.controls['pincode'].value.length === 6) {
      this.utilitiesService.dialogParams.body = "Fetching location details, please wait...";
      this.utilitiesService.showLoaderDialog();
      this.profileUpdateService.fetchLocationDetails(this.address.controls['pincode'].value).subscribe(data => {
        this.utilitiesService.closeAllDialogs();
        const postalCodeData = Object.values(data.results);
        this.address.controls['city'].setValue(postalCodeData[0][0].province);
        this.address.controls['state'].setValue(postalCodeData[0][0].state);
        this.address.controls['country'].setValue(postalCodeData[0][0].country_code);
      })
    }
  }

}
