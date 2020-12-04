import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from '../students/students.component';

const routes: Routes = [
  {
    path: '',
    data: {title: ' - Students'},
    component: StudentsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRouterModule { }
