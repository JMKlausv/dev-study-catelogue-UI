import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogUtility, hideSpinner, showSpinner } from '@syncfusion/ej2-angular-popups';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.interface';
import { Framework } from 'src/app/models/framework.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
}) 
export class CourseFormComponent implements OnInit {

  constructor(private apiService:ApiService , private router:Router , private cookieService: CookieService) { }
  course:Course = this.router.getCurrentNavigation()?.extras.state as Course;
  pageTitle!:string;
  mode!:string;
  frameworks:Framework[]=[];
  fields:Object = {text:"name",value:"id"};
  difficulties:string[]=["beginner","intermediate", "Advanced"];
  platforms:string[]=["youtube", "coursera", "udemy","blog","book","web"];
  divisions:string[]=["upper","medium","lower"];
  currentUserId = this.cookieService.get("userId");

  courseForm:FormGroup= new FormGroup({
    title: new FormControl('', [Validators.required]),
    authorName: new FormControl(),
    imageUrl: new FormControl(),
    contentLink: new FormControl('', [Validators.required]),
    publishedDate: new FormControl(),
    description: new FormControl(),
    frameworkId : new FormControl('', [Validators.required]),
    difficulty : new FormControl('', [Validators.required]),
    platformType : new FormControl('', [Validators.required]),
    division : new FormControl('user division', [Validators.required]),
    id: new FormControl(),//// hidden value ////
    uploadedBy: new FormControl(this.currentUserId, [Validators.required])/// hiddedn value////////
  });

  get title():FormControl{
   return this.courseForm.get("title") as FormControl;
  }
  get authorName():FormControl{
    return this.courseForm.get("authorName") as FormControl;
   }
   get imageUrl():FormControl{
    return this.courseForm.get("imageUrl") as FormControl;
   }
   get contentLink():FormControl{
    return this.courseForm.get("contentLink") as FormControl;
   }
   get publishedDate():FormControl{
    return this.courseForm.get("publishedDate") as FormControl;
   }
   get frameworkId():FormControl{
    return this.courseForm.get("frameworkId") as FormControl;
   }
   get difficulty():FormControl{
    return this.courseForm.get("difficulty") as FormControl;
   }
   get platformType():FormControl{
    return this.courseForm.get("platformType") as FormControl;
   }
   get division():FormControl{
    return this.courseForm.get("division") as FormControl;
   }
   

  ngOnInit(): void {
    if(this.course == null){
      this.pageTitle="Add New Course";
      this.mode="add";
    }else{
      this.pageTitle="Update Course";
      this.mode="edit";
      this.courseForm.patchValue(this.course);
    }
    this._fetchFrameworks();
  }

  submit(){
    if(this.courseForm.valid){
      showSpinner(document.getElementById("container")!);
      var command : Observable<Object> = this.mode=="add"
      ?this.apiService.post('Course/',this.courseForm.value)
      :this.apiService.edit('Course/',this.courseForm.value);

     command.subscribe({
        next:res=>{
          hideSpinner(document.getElementById("container")!);
          this.router.navigate(['admin/course']);
        },
        error:error=>{
          hideSpinner(document.getElementById("container")!);
          console.log(error);
          switch(error.status){
            case 400:
             this._openDialogue("Invalid input");break;
            default:
               this._openDialogue("some thing went wrong : please try again");
         }
        }
      })
    }
  }
  cancel(){
this.router.navigate(["/admin/course"])
  }
  private _fetchFrameworks(){
    this.apiService.get("Framework").subscribe({
      next:res=>{
        this.frameworks = res as Framework[];
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  _openDialogue(message:string){
    DialogUtility.alert({
      title:"Error",
      content:message,
      position:  { X:'center', Y: 'center' },
      
    });
  
    }
}
