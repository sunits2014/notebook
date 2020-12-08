import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses/courses/courses.component';
import { CanActivateService } from '../services/can-activate.service';
import { RouteResolverService } from '../services/route-resolver.service';

const routes: Routes = [
  {
    path: '',
    data: {title: ' - Courses'},
    component: CoursesComponent,
    resolve: { images: RouteResolverService },
    canActivate: [CanActivateService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRouterModule { }
