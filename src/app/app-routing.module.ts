import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateService } from '../app/services/can-activate.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authenticate',
  },
  {
    path: 'authenticate',
    loadChildren: () => import('../app/authentication/authenticate.module').then(mod => mod.AuthenticateModule),
  },
  {
    path: 'home',
    loadChildren: () => import('../app/home/home.module').then(mod => mod.HomeModule),
    canActivate: [CanActivateService]
  },
  {
    path: 'courses',
    loadChildren: () => import('../app/courses/courses.module').then(mod => mod.CoursesModule),
    canActivate: [CanActivateService]
  },
  {
    path: 'students',
    loadChildren: () => import('../app/students/students.module').then(mod => mod.StudentsModule),
    canActivate: [CanActivateService]
  },
  {
    path: 'forum',
    loadChildren: () => import('../app/forum/forum.module').then(mod => mod.ForumModule),
    canActivate: [CanActivateService]
  },
  {
    path: 'contact',
    loadChildren: () => import('../app/contact/contact.module').then(mod => mod.ContactModule),
    canActivate: [CanActivateService]
  },
  {
    path: 'profile',
    loadChildren: () => import('../app/profile/profile.module').then(mod => mod.ProfileModule),
    canActivate: [CanActivateService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
