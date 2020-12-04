import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticateRouter } from '../authentication/authenticate-router.module';
import { SharedModule } from '../shared/shared.module';
import { WelcomeComponent, ForgotPassComponent, RegisterComponent } from '../../app/componentsIndex';
import { UtilitiesService } from '../services/utilities.service';

@NgModule({
  declarations: [WelcomeComponent, ForgotPassComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthenticateRouter,
    SharedModule
  ],
  providers: [UtilitiesService]
})

export class AuthenticateModule { }