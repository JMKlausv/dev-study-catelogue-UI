import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { Course } from 'src/app/models/course.interface';
import { ApiService } from 'src/app/shared/api.service';
 
interface FetchPreferenceResponse{
  likedCourses : number[],
  dislikedCourses : number[]
}

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
     this.fetchUserpreferences();
     this.fetchTopRatedCourses();
     this.fetchRecentCourses();

   console.log(this.currentUserLikes)
  }
  viewCourseDetial(){
    window.alert("this is a course")
  }
  onLike(course:any){
    var likeChanged = false;
    var dislikeChanged = false;
    var courseId:any = course.id;
    var upvoteCount : number = course.upvoteCount;
    var downvoteCount : number = course.downvoteCount;
   if(!this.currentUserLikes.includes(courseId)){
    this.currentUserLikes.push(courseId);
    upvoteCount++;
    likeChanged = true;
   }
   if(this.currentUserDislikes.includes(courseId)){
    this.currentUserDislikes = this.currentUserDislikes.filter(dl=>dl!=courseId);
    downvoteCount--;
    dislikeChanged = true;
   }
   var requestObject = {
    id: '',
    userId:this.cookieService.get("userId"),
    likedCourses:likeChanged?this.currentUserLikes:null,
    dislikedCourses:dislikeChanged?this.currentUserDislikes:null
   }
if(requestObject.likedCourses!=null || requestObject.dislikedCourses!=null){

   this.apiService.edit("User/updateLikes",requestObject).subscribe({
    next:res=>{
      this.updateLocal();
      this.updateCourseVoteCount(courseId,upvoteCount,downvoteCount).subscribe({
        next:res2=>{
          this.ngOnInit();
        },
        error: error2=>{
          console.log(error2);
        }
      });
    },
    error: error=>{
     console.log(error);
    }
   })
  }
  }
  onDislike(course:Course){
    var likeChanged = false;
    var dislikeChanged = false;
    var courseId:any = course.id;
    var upvoteCount : number = course.upvoteCount;
    var downvoteCount : number = course.downvoteCount;
   if(!this.currentUserDislikes.includes(courseId)){
    this.currentUserDislikes.push(courseId);
    downvoteCount++;
    dislikeChanged = true;

   }
   if(this.currentUserLikes.includes(courseId)){
    this.currentUserLikes = this.currentUserLikes.filter(dl=>dl!=courseId);
    upvoteCount--;
    likeChanged = true;
   }
   var requestObject = {
    id: '',
    userId:this.cookieService.get("userId"),
    likedCourses:likeChanged?this.currentUserLikes:null,
    dislikedCourses:dislikeChanged?this.currentUserDislikes:null
   }
if(requestObject.likedCourses != null || requestObject.dislikedCourses != null){
  this.apiService.edit("User/updateLikes",requestObject).subscribe({
    next:res=>{
      this.updateLocal()
      this.updateCourseVoteCount(courseId,upvoteCount,downvoteCount).subscribe({
        next:res2=>{
          this.ngOnInit();
        },
        error: error2=>{
          console.log(error2);
        }
      });
      
    },
    error: error=>{
     console.log(error);
    }
   })
}

  }
  changeImageSrc(event:any){
    event.target.src = "../../../assets/images/learnToCode.jfif"
  }



  private fetchUserpreferences(){
    
    // var user = AuthService.currentUser;
    // if(user == null){
    //   this.currentUserLikes = this.cookieService.get("likedCourses").split(";").map(str=>Number(str));
    //   this.currentUserDislikes = this.cookieService.get("disLikedCourses").split(";").map(str=>Number(str));
    //  }else{
    //   this.currentUserLikes = user.likedCourses;
    //   this.currentUserDislikes = user.dislikedCourses;
    //  }
 
    var  id:string = this.cookieService.get("userId")
    
    this.apiService.get("User/userPreference/"+id).subscribe({
      next:res=>{
        var response = res as unknown as FetchPreferenceResponse;
        this.currentUserLikes = response.likedCourses;
        this.currentUserDislikes = response.dislikedCourses;
        console.log("likeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(this.currentUserLikes);
        console.log("disssssssssssssssslikeeeeeeeeeeeeeeeeeeeeeeee")

        console.log(this.currentUserDislikes);
      },
      error:error =>{
        console.log(error)
      }
    });
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
  private fetchRecentCourses(){
    var query: string = `Course?orderBy="createdAt"&maxCount=20`;
    this.apiService.get(query).subscribe({
      next:res=>{
        this.recentlyAdded = res as Course[] ;
        console.log("recentttttttttttttttttttttttttttttttttttt")
        console.log(this.recentlyAdded);
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
  private updateCourseVoteCount( courseId : number , upvoteCount:number , downvoteCount:number){
    var jsonPatchDoc = [
      {
        "path": "upvoteCount",
        "op": "replace",
        "value":`${upvoteCount}`
      },
      {
        "path": "downvoteCount",
        "op": "replace",
        "value":`${downvoteCount}`
      }
    ];
   return  this.apiService.patch("Course/"+courseId,jsonPatchDoc);
  }
}
