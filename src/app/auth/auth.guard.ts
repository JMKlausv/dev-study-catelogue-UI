
import { Injectable }       from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
 
@Injectable({
    providedIn: 'root'
  })
export class AuthGuardService implements CanLoad {
  
  constructor(private authService: AuthService) {
  }
 
  canLoad(route: Route): boolean {
  
    if (!this.authService.checkAuthState()) {
      alert('You are not authenticated to visit this page please login first');
      return false;
    }  
    return true; 
  }
} 