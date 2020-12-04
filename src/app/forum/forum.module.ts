import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum/forum.component';
import { SharedModule } from '../shared/shared.module';
import { ForumRouterModule } from '../forum/forum-router/forum-router.module';


@NgModule({
  declarations: [ForumComponent],
  imports: [
    CommonModule,
    SharedModule,
    ForumRouterModule
  ]
})
export class ForumModule { }
