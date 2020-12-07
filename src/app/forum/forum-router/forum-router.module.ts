import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteResolverService } from 'src/app/services/route-resolver.service';
import { ForumComponent } from '../forum/forum.component';

const routes: Routes = [
  {
    path: '',
    data: {title: ' - Forum'},
    component: ForumComponent,
    resolve: { images: RouteResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRouterModule { }
