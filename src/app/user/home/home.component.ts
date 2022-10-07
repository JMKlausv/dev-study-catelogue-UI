import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Course } from 'src/app/models/course.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topRated:Course[]=[];
  recentlyAdded:Course[]=[];

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    var   query:string  = `Course?orderBy="avgVote"&maxCount=20`;
   this.apiService.get(query).subscribe({
    next:res=>{
      this.topRated = res as Course[] ;
      console.log(this.topRated);
    },
    error:error=>{
      console.log(error);
    }
   })
  
  }
  viewCourseDetial(){
    window.alert("this is a course")
  }

}
