import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  RouterModule, Routes } from '@angular/router';
import { AuthModule } from '../app/auth/auth.module';
import { AdminComponent } from './admin/admin.component';
import { AdminGuardService } from './admin/admin.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHttpInterceptor } from './AppHttpInterceptor.service';
import { AuthGuardService } from './auth/auth.guard';
import { SharedModule } from './shared/shared.module';
import { UserComponent } from './user/user.component';

const routes : Routes=[
  {
    path: '',
    redirectTo: 'auth', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: ()=>import('../app/auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path:"admin",
    component:AdminComponent,
    loadChildren : ()=>import("../app/admin/admin.module").then(m=>m.AdminModule),
    canLoad:[AdminGuardService]
  },
  {
    path:"user",
    component: UserComponent,
    loadChildren: ()=>import("../app/user/user.module").then(m=>m.UserModule),
    canLoad:[AuthGuardService]
  }
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule,
    AuthModule,

  ],
  providers: [
 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
