import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteResolverService } from 'src/app/services/route-resolver.service';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  {
    path: '',
    data: {title: ' - Profile'},
    component: ProfileComponent,
    resolve: { images: RouteResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRouterModule { }
