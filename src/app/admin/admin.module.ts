import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuardService } from './admin.guard';
import { AdminService } from './admin.service';
import { SharedModule } from '../shared/shared.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CommandColumnService, EditService, GridModule } from '@syncfusion/ej2-angular-grids';
import { DashboardGridComponent } from './dashboard/dashboard-grid/dashboard-grid.component';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { UserCoursesComponent } from './user-courses/user-courses.component';

const routes : Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,

  },
  {
    path: "language",
   loadChildren: ()=>import('../admin/language/language.module').then(m=>m.LanguageModule)

  },
  {
    path: "framework",
    loadChildren: ()=>import('../admin/framework/framework.module').then(m=>m.FrameworkModule)
  },
  {
    path: "course",
   loadChildren: ()=>import('../admin/course/course.module').then(m=>m.CourseModule)

  },
]

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    DashboardGridComponent,
    UserCoursesComponent,

 
  ],
  imports: [
    CommonModule,
    SidebarModule,
    SharedModule,
    ToastModule,
    GridModule,
    DropDownListModule,
    RouterModule.forChild(routes)
  ],
  providers:[
AdminGuardService,
AdminService,
EditService, 
CommandColumnService

  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
