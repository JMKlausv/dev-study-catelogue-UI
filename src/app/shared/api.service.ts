import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
const API_URL = "https://localhost:7044/api/";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }

  getAll(url:string){
    return this.http.get(API_URL+url);
  }

}
