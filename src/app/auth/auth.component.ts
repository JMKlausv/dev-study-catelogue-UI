import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { createSpinner, DialogUtility, hideSpinner, showSpinner } from '@syncfusion/ej2-angular-popups';
import { CookieService } from 'ngx-cookie-service';
import { CustomeValidators } from '../shared/CustomeValidators';
import { AuthService } from './auth.service';
 const enum authMode  {login ,signup};

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router:Router ,private authService:AuthService , private cookieService:CookieService) { }

  public title:string = "Login";
  public navText:string = "signup"
  public buttonName:string = "Login"
  public isSignup: boolean = false;
  public loginForm :FormGroup = new FormGroup({
    userName : new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,]),
    confirmPassword: new FormControl('',[Validators.required])
  },[CustomeValidators.MatchValidator('password','confirmPassword')])

  get userName():FormControl{
    return this.loginForm.get('userName') as FormControl;
  }
  get email(): FormControl{
    return this.loginForm.get('email',) as FormControl;
  }
  get password(): FormControl{
    return this.loginForm.get('password' ) as FormControl;
  }
  get confirmPassword(): FormControl{
    return this.loginForm.get('confirmPassword') as FormControl;
  }
  ngOnInit(): void {
    console.log("auth is runngin");
  }
  ngAfterViewInit(){
    createSpinner({
      target: document.getElementById('wrapper')!
    });
  }
  submit(){
    var user = {
      userName:this.userName.value,
      password:this.password.value,
      email:this.isSignup ? this.email.value : null
    };
    var isValid :boolean;
    var mode:string;
    if(this.isSignup){
    isValid=  this.userName.valid && this.password.valid && this.email.valid;
    mode = "signup";
    }else{
      isValid = this.userName.valid && this.password.valid;
      mode = "login";
    }
    if(isValid){
        showSpinner(document.getElementById('wrapper')!);
        this.authService.authenticate(user,mode).subscribe(
        {
          next:res=>{
           
            hideSpinner(document.getElementById('wrapper')!);
            if(this.isSignup){
              this.toggle();
            }else{
              var role = this.cookieService.get("role");
              
              if(role == "admin"){
                this.router.navigate(["/admin/dashboard"])
              }else{
                this.router.navigate(["/user"])
              }
            }
            
          },
          error:error=>{
            hideSpinner(document.getElementById("wrapper")!);
            switch(error.status){
              case 400:
               this.showErrorDialogue("Invalid input : username and email should be unique");break;
               case 401:
                this.showErrorDialogue("Invalid Loging: please try agian");break;
               default:
                 this.showErrorDialogue("some thing went wrong : please try again"+error.message);
           }
         }})
        }
   
     
    }
    

  
  toggle(){
    this.isSignup = !this.isSignup;
    this.title = this.navText;
    this.navText = this.buttonName;
    this.buttonName = this.title;
  }
  showErrorDialogue(message:string){
   
    DialogUtility.alert({
      title:"Error",
      content:message,
      position:  { X:'center', Y: 'center' },
      
    });
  }

}
