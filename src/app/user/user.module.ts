import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

 const routes : Routes = [
  {
    path: "home",
    component: HomeComponent
  }
 ]

@NgModule({
  declarations: [
    UserComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)

  ],
  exports: [UserComponent]
})
export class UserModule { }
