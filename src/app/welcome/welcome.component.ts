import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service';
import { WelcomeService } from '../services/welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public logoURL: any;
  public selectedOption: string;
  public loginForm: FormGroup;

  constructor(
    private welcomeService: WelcomeService, 
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { 
  }

  ngOnInit(): void {
    this.logoURL = this.activeRoute.snapshot.data.images.loginLogo;
    this.loginForm = this.formBuilder.group({
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  public loginUser() {
    if (this.loginForm.valid) {
      const responseObj = {
        title: '',
        message: ''
      }
      this.loginForm.disable();
      this.welcomeService.userLogin(this.loginForm.controls).then(response => {
        if (response.message) {
          responseObj.title = 'Alert';
          responseObj.message = response.message;
          this.utilities.showBasicSnackBar(responseObj, 'error-in-snackBar');
          this.loginForm.enable();
        } else {
          responseObj.title = 'Success';
          responseObj.message = response + ' You will be redirected to your dashboard now.'
          this.utilities.showBasicSnackBar(responseObj, 'success-in-snackBar');
          setTimeout(() => {
            this.router.navigate(['main'])
          },4000)
        }        
      });
    }    
  }

}
