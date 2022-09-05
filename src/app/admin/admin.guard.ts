
import { Injectable }       from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

 
@Injectable({
    providedIn: 'root'
  })
export class AdminGuardService implements CanLoad {
  
  constructor(private authService: AuthService) {
  }
 
  canLoad(route: Route): boolean {
  
    if (!this.authService.checkAdminPermission()) {
      alert('You are not authorised to visit this page');
      return false;
    }  
    return true; 
  }
} 