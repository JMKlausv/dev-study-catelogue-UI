import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

const routes:Routes = [
  {
    path:"",
    component: CourseListComponent
  },
  {
    path:"form",
    component: CourseFormComponent
  },

]

@NgModule({
  declarations: [
    CourseListComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DropDownListModule,
    RouterModule.forChild(routes)
  ]
})
export class CourseModule { }
