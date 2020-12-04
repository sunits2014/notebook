import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumComponent } from '../forum/forum.component';

const routes: Routes = [
  {
    path: '',
    data: {title: ' - Forum'},
    component: ForumComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRouterModule { }
