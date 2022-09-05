import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth.guard';

const routes : Routes = [
  {
    path: "",
    component: AuthComponent
  }
]

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DialogModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: ()=>{
          return localStorage.getItem("auth_token");
        },
        allowedDomains: ["https://localhost:7247/"],
       // disallowedRoutes: ["http://example.com/examplebadroute/"],
       skipWhenExpired: true,
      },
    }),
    RouterModule.forChild(routes)
  ],
  providers:[
    AuthService,
    CookieService,
    AuthGuardService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService
  ]
})
export class AuthModule { }
