export interface User{
    id?:string;
    email:string;
    userName:string;
    role:string;
    likedCourses:number[];
    dislikedCourses:number[];
}