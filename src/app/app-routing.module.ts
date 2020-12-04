import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from '../app/landing/landing.component';
import { RouteResolverService } from '../app/services/route-resolver.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authenticate'
  },
  {
    path: 'authenticate',
    loadChildren:  () => import('../app/authentication/authenticate.module').then(mod => mod.AuthenticateModule),
  },  
  {
    path: 'main',
    data: {title: ' - '},
    component: LandingComponent,
    resolve: { images: RouteResolverService },
    children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../app/home/home.module').then(mod => mod.HomeModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('../app/courses/courses.module').then(mod => mod.CoursesModule),
      },
      {
        path: 'students',
        loadChildren: () => import('../app/students/students.module').then(mod => mod.StudentsModule),
      },
      {
        path: 'forum',
        loadChildren: () => import('../app/forum/forum.module').then(mod => mod.ForumModule),
      },
      {
        path: 'contact',
        loadChildren: () => import('../app/contact/contact.module').then(mod => mod.ContactModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../app/profile/profile.module').then(mod => mod.ProfileModule),
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
