import { Component, OnInit } from '@angular/core';
import { hideSpinner, showSpinner } from '@syncfusion/ej2-angular-popups';
import { ColumnData } from 'src/app/models/columnData';
import { Course } from 'src/app/models/course.interface';
import { Framework } from 'src/app/models/framework.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  frameworks:Framework[]=[];
  allCourseCount!:number ;
  userCourseCount!:number;
  uesrCourseData!:Course[];
  adminCourseData!:Course[];
  columnData:ColumnData[]=[
    {field:"title",headerText:"Title"},
    {field:"authorName",headerText:"Author"},
    {field:"framework.name",headerText:"Framework"},
    {field:"upvoteCount",headerText:"upvote"},
    {field:"downvoteCount",headerText:"Downvote"},
    {field:"division",headerText:"Division"}
  ];
  ngOnInit(): void {
    this._getAllCourseCount();
    this._getUserCourseCount();
    this._fetchUserCourses();
    this._fetchAdminCourses();

  }



onAdminCourseEdit(event:any){

}
onUserCourseEdit(course:Course){
  if(window.confirm("Are You sure you want to approve upgrading the course to lower division? ")){
     course.frameworkId = course.framework.id;
     course.division = "lower";
     showSpinner(document.getElementById("wrapper")!);
     this.apiService.edit('Course/',course).subscribe({
      next:res=>{
        hideSpinner(document.getElementById("wrapper")!);
       this.ngOnInit();
      },
      error:error=>{
        hideSpinner(document.getElementById("wrapper")!);
        console.log(error);
       
      }
    })
  }
}

  private _fetchAdminCourses(frameworkId?:number){
    var query;
    if(frameworkId!=null){
       query = "Course?uploadedBy=admin?filter=high?frameworkId=frameworkId";
    }else{
      query = "Course?uploadedBy=admin?filter=high";
    }
  
    this.apiService.get(query).subscribe({
      next:res=>{
        this.adminCourseData = res as Course[];
      },
      error:error=>{
        console.log(error);
      }
    })
  }
  private _fetchUserCourses(frameworkId?:number){
    var query;
    if(frameworkId!=null){
      query = "Course?UploadedBy=user?filter=high?frameworkId=frameworkId"
    }else{
      query = "Course?uploadedBy=user?filter=high";
    }
   
    this.apiService.get(query).subscribe({
      next:res=>{
        this.uesrCourseData = res as Course[];
      },
      error:error=>{
        console.log(error);
      }
    })
  }
  onFilterChange(frameworkId:number,isAdmin:boolean){
    if(isAdmin){
      this._fetchAdminCourses(frameworkId);
    }else{
      this._fetchUserCourses(frameworkId);
    }
  }
private  _getAllCourseCount(){
this.apiService.get("Course/count").subscribe({
  next:res=>{
    this.allCourseCount = res as number;
  }, 
  error:error=>{
    console.log(error);
  }
})
  }
 private _getUserCourseCount(){
    this.apiService.get("Course/count").subscribe({
      next:res=>{
      this.userCourseCount = res as number;
      },
      error:error=>{
        console.log(error);
      }
    })
  }
}
