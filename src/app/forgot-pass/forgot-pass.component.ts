import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WelcomeService } from '../services/welcome.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  public logoURL: any;
  public resetForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private welcomeService: WelcomeService, private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.logoURL = this.activeRoute.snapshot.data.images.registerLogo;
    this.resetForm = this.formBuilder.group({
      emailAddress: new FormControl('',[Validators.required, Validators.email])
    })
  }

  public reset() {
    this.welcomeService.resetPassword(this.resetForm.controls).then(response => {
      if (response.message) {
        console.log(response.message);
      } else {
        console.log(response);
      }
    })
  }

}
