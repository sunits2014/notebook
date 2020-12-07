import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteResolverService } from 'src/app/services/route-resolver.service';
import { ContactComponent } from '../contact/contact.component';

const routes: Routes = [
  {
    path: '',
    data: {title: ' - Contact'},
    component: ContactComponent,
    resolve: { images: RouteResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRouterModule { }
