import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
const API_URL = "https://localhost:7044/api/";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }

  get(url:string){
    return this.http.get(API_URL+url);
  }
  post(url:string, data:any ,  responseType:any = 'json'){
 
    return this.http.post(API_URL+url , data , {responseType:responseType}) 
  }
  delete(url:string){
    return this.http.delete(API_URL+url);
  }
  edit(url:string, data:any){
    return this.http.put(API_URL+url,data);
  }

}
