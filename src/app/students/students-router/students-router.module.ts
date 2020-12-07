import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteResolverService } from 'src/app/services/route-resolver.service';
import { StudentsComponent } from '../students/students.component';

const routes: Routes = [
  {
    path: '',
    data: {title: ' - Students'},
    component: StudentsComponent,
    resolve: { images: RouteResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRouterModule { }
