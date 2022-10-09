import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { Course } from 'src/app/models/course.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService : ApiService , private cookieService: CookieService) { }

  topRated:Course[]=[];
  recentlyAdded:Course[]=[];
  currentUserLikes!:number[];
  currentUserDislikes!:number[];

  ngOnInit(): void {
   this.fetchTopRatedCourses();
   this.fetchUserpreferences();
   console.log(this.currentUserLikes)
  }
  viewCourseDetial(){
    window.alert("this is a course")
  }
  onLike(courseId:any){
    var likeChanged = false;
    var dislikeChanged = false;
   if(!this.currentUserLikes.includes(courseId)){
    this.currentUserLikes.push(courseId);
    likeChanged = true;
   }
   if(this.currentUserDislikes.includes(courseId)){
    this.currentUserDislikes = this.currentUserDislikes.filter(dl=>dl!=courseId);
    dislikeChanged = true;
   }
   var requestObject = {
    id: '',
    userId:this.cookieService.get("userId"),
    likedCourses:likeChanged?this.currentUserLikes:null,
    dislikedCourses:dislikeChanged?this.currentUserDislikes:null
   }

   this.apiService.edit("User/updateLikes",requestObject).subscribe({
    next:res=>{
      this.updateLocal()
    },
    error: error=>{
     console.log(error);
    }
   })


  }
  onDislike(courseId:any){
    var likeChanged = false;
    var dislikeChanged = false;
   if(!this.currentUserDislikes.includes(courseId)){
    this.currentUserDislikes.push(courseId);
    dislikeChanged = true;
   }
   if(this.currentUserLikes.includes(courseId)){
    this.currentUserLikes = this.currentUserLikes.filter(dl=>dl!=courseId);
    likeChanged = true;
   }
   var requestObject = {
    id: '',
    userId:this.cookieService.get("userId"),
    likedCourses:likeChanged?this.currentUserLikes:null,
    dislikedCourses:dislikeChanged?this.currentUserDislikes:null
   }

   this.apiService.edit("User/updateLikes",requestObject).subscribe({
    next:res=>{
      this.updateLocal()
      console.log("updated like and dislike.......")
      console.log(this.currentUserLikes)
      console.log(this.currentUserDislikes)
    },
    error: error=>{
     console.log(error);
    }
   })
  }
  changeImageSrc(event:any){
    event.target.src = "../../../assets/images/learnToCode.jfif"
  }



  private fetchUserpreferences(){
    
    var user = AuthService.currentUser;
    if(user == null){
      this.currentUserLikes = this.cookieService.get("likedCourses").split(";").map(str=>Number(str));
      this.currentUserDislikes = this.cookieService.get("disLikedCourses").split(";").map(str=>Number(str));
     }else{
      this.currentUserLikes = user.likedCourses;
      this.currentUserDislikes = user.dislikedCourses;
     }
  }
  private fetchTopRatedCourses(){
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
  private updateLocal(){
    if(AuthService.currentUser != null){
      AuthService.currentUser.likedCourses = this.currentUserLikes;
      AuthService.currentUser.dislikedCourses = this.currentUserDislikes;
    }
    this.cookieService.set("likedCourses", this.currentUserLikes.join(";")) ;
    this.cookieService.set("disLikedCourses", this.currentUserDislikes.join(";"));

  }
}
