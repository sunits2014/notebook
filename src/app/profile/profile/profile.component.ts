import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';

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

  constructor(private activeRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.user = {} as IUser;
    this.activeRoute.data.subscribe(value => {
      this.user = value.images.user;
    });
    this.address = this.formBuilder.group({
      main: new FormControl(this.user.address[0].main, Validators.required),
      city: new FormControl(this.user.address[0].city, Validators.required),
      state: new FormControl(this.user.address[0].state, Validators.required),
      postal: new FormControl(this.user.address[0].postal, Validators.required)
    })
   }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      fullName: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      telephone: new FormControl(this.user.phone, [Validators.required]),
      address: this.address
    })
  }

  public updateProfile() {
    console.log(this.profileForm)
  }

}
