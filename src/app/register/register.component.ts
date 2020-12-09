import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WelcomeService } from '../services/welcome.service';
import { CustomValidators } from '../services/custom-validators';
import { UtilitiesService } from '../services/utilities.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput: ElementRef;

  public logoURL: any;
  public registerForm: FormGroup;
  public showErrors: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private welcomeService: WelcomeService,
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.logoURL = this.activeRoute.snapshot.data.images.registerLogo;
    this.registerForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',
        Validators.compose([
          // 1. Password Field is Required
          Validators.required,
          // 2. check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true
            }
          ),
          // 6. Has a minimum length of 8 characters
          Validators.minLength(8)
        ])
      ),
      confirmPassword: new FormControl('', Validators.compose([Validators.required])),
    },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      })
  }

  public showErrorBlock() {
    this.showErrors = true;
  }

  public hideErrorBlock() {
    this.showErrors = false;
  }

  public registerUser() {
    if (this.registerForm.valid) {
      const responseObj = {
        title: '',
        message: ''
      }
      this.registerForm.disable();
      this.welcomeService.registerUser(this.registerForm.controls).then(response => {
        if (response.message) {
          this.utilities.toaster.title = 'Alert';
          this.utilities.toaster.message = response.message
          this.utilities.showBasicSnackBar('error-in-snackBar');
          this.registerForm.enable();
        } else {
          this.utilities.toaster.title = 'Success';
          this.utilities.toaster.message = response + ' You will be redirected to the Login page now.'
          this.utilities.showBasicSnackBar('success-in-snackBar');
          setTimeout(() => {
            this.router.navigate(['']);
          }, 4000);
        }
      })
    }
  }
}
