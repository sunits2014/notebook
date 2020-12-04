import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { WelcomeComponent, ForgotPassComponent, RegisterComponent } from '../../app/componentsIndex';
import { RouteResolverService } from '../services/route-resolver.service';

const routes: Routes = [
  {
    path: '',
    data: {title: ' - '},
    component: AuthenticationComponent,
    children: [
        {
            path: '',
            data: {title: ' - Login'},
            component: WelcomeComponent,
            resolve: { images: RouteResolverService }
          },
          {
            path: 'signup',
            data: {title: ' - Sign Up'},
            component: RegisterComponent,
            resolve: { images: RouteResolverService }
          },
          {
            path: 'reset-password',
            data: {title: ' - Reset Password'},
            component: ForgotPassComponent,
            resolve: { images: RouteResolverService }
          },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthenticateRouter {}