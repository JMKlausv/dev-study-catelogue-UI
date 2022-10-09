import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.interface';
import { ApiService } from '../shared/api.service';

 interface AuthResponse{
  tokenString:string;
  likedCourses:string;
  dislikedCourses:string;

}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static currentUser :User|null;

  constructor(private apiService:ApiService ,  private jwtHelper: JwtHelperService , private cookieService:CookieService) { }

  // aud: "https://localhost:7247"
  // exp: 1662414584
  // http://schemas.microsoft.com/ws/2008/06/identity/claims/role: "admin"
  // http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress: "admin@gmail.com"
  // http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name: "admin"
  // http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier: "80566136-eb93-4bf1-9a0c-bfd7ea903dc9"
  // iss: "https://localhost:4200"
  // nbf: 1662328184
  authenticate(user:any,mode:string):Observable<any>{
if(mode == "signup"){
  return this.apiService.post("User/create",user);

}
 return this.apiService.post("User/login",user,'text').pipe(map(res=>{
     if(res){
      var response = JSON.parse(res as unknown as string);
      console.log(response.tokenString)
      var decoded = this.jwtHelper.decodeToken(response.tokenString);
      var expDate:Date|null = this.jwtHelper.getTokenExpirationDate(response.tokenString);
      this.setCookies(decoded ,  expDate , response.likedCourses, response.dislikedCourses);
      localStorage.setItem("auth_token",response.tokenString);

     }
    }));
  }
 private setCookies(decodedToken:any, expDate:Date|null , likedCourses:string,dislikedCourses:string){
  
  var userName:string = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  var email:string = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
  var role :string= decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  var userId:string = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  if(expDate!=null){
      this.cookieService.set("userId",userId,expDate);
      this.cookieService.set("userName",userName,expDate);
      this.cookieService.set("email",email,expDate);
      this.cookieService.set("role",role,expDate);
      this.cookieService.set("likedCourses",likedCourses,expDate);
      this.cookieService.set("disLikedCourses",dislikedCourses,expDate);
    var likes : number[] = likedCourses.split(";").map(str=>Number(str));
    var dislikes : number[] = dislikedCourses.split(";").map(str=>Number(str));
      AuthService.currentUser = {
        userName:userName,
        id:userId,
        email:email,
        role:role,
        likedCourses:likes,
        dislikedCourses:dislikes
      }
    }
  }

  checkAuthState(){
    return this.cookieService.check('userId');
  }
  checkAdminPermission(){
    return this.cookieService.get("role") == "admin";
  }
}

