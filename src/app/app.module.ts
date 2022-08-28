import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const routes : Routes=[
  {
    path: '',
    redirectTo: 'auth', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: ()=>import('../app/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:"admin",
    component:AdminComponent,
    loadChildren : ()=>import("../app/admin/admin.module").then(m=>m.AdminModule)
  },
  {
    path:"user",
    loadChildren: ()=>import("../app/user/user.module").then(m=>m.UserModule)
  }
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
