import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateService } from '../services/can-activate.service';
import { RouteResolverService } from '../services/route-resolver.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    data: {title: ' - Home'},
    component: HomeComponent,
    resolve: { images: RouteResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
