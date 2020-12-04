import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students/students.component';
import { SharedModule } from '../shared/shared.module';
import { StudentsRouterModule } from '../students/students-router/students-router.module';

@NgModule({
  declarations: [StudentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    StudentsRouterModule
  ]
})
export class StudentsModule { }
