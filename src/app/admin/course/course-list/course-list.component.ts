import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastUtility } from '@syncfusion/ej2-angular-notifications';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-angular-popups';
import { ColumnData } from 'src/app/models/columnData';
import { Course } from 'src/app/models/course.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor(private apiService:ApiService , private router:Router) { }

  courseData!:Course[];
  columnData:ColumnData[]=[
    {field:"title",headerText:"Title"},
    {field:"authorName",headerText:"Author"},
    {field:"publishedDate",headerText:"PublishedAt"},
    {field:"framework.name",headerText:"Framework"},
    {field:"difficulty",headerText:"Difficulty"},
    {field:"platformType",headerText:"Platform"},
    {field:"upvoteCount",headerText:"upvote"},
    {field:"downvoteCount",headerText:"Downvote"},
    {field:"division",headerText:"Division"}
  ];

  ngOnInit(): void {
   this.apiService.get("Course").subscribe({
    next: res=>{
      this.courseData = res as Course[];
    },
    error: error=>{
      console.log(error);
    }
   })
  }
  ngAfterViewInit(){
    createSpinner({
      target:document.getElementById("container")!
    })
  }

  addCourse(){
  this.router.navigate(["/admin/course/form"]);
  }
  editCourse(course:Course){
    this.router.navigate(["/admin/course/form"],{state:course});
 
  }
  deleteCourse(id:number){

    if(window.confirm("Are you sure you want to delete the selected Course?")){
      showSpinner(document.getElementById("container")!);
      this.apiService.delete("Course/"+id).subscribe({
        next:res=>{
          hideSpinner(document.getElementById("container")!);
          ToastUtility.show('the course has been deleted successfully', 'Success', 2000).position.X='center';
          this.ngOnInit();    
        },
        error:error=>{
          console.log(error.message)
          hideSpinner(document.getElementById('container')!);
          ToastUtility.show('something went wrong', 'Error', 2000);
        }
       })
    }
  }

}
