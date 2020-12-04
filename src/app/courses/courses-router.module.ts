import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses/courses/courses.component';

const routes: Routes = [
  {
    path: '',
    data: {title: ' - Courses'},
    component: CoursesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRouterModule { }
