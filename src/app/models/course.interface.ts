export interface Course{
    id?:number;
    title:string;
    authorName:string;
    imageUrl?:string;
    contentLink:string;
    publishedDate:Date;
    frameworkId?:number;
    framework:{id:number,name:String};
    difficulty:string;
    platformType:string;
    upvoteCount:number;
    downvoteCount:number;
    uploadedBy:string;
    division:string;
}