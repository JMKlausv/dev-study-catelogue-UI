import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuardService } from './admin.guard';
import { AdminService } from './admin.service';

const routes : Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,

  },
  {
    path: "language",
   loadChildren: ()=>import('../admin/language/language.module').then(m=>m.LanguageModule)

  },
]

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent
 
  ],
  imports: [
    CommonModule,
    SidebarModule,
    RouterModule.forChild(routes)
  ],
  providers:[
AdminGuardService,
AdminService
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
