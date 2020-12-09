import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRouterModule } from '../profile/profile-router/profile-router.module';
import { ProfileImageComponent } from '../componentsIndex';
@NgModule({
  declarations: [ProfileComponent, ProfileImageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRouterModule
  ]
})
export class ProfileModule { }
