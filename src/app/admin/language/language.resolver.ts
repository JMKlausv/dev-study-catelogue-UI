import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Language } from 'src/app/models/language.interface';
import { ApiService } from 'src/app/shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageResolver implements Resolve<Language| undefined > {
  constructor(private apiService:ApiService){

  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Language> | Promise<Language>|Language| undefined {
    if(!route.queryParamMap.get('id')){
      return undefined;
    }
 
    return this.apiService.get("Language/"+route.queryParamMap.get('id') )as Observable<Language>;
  }
}
