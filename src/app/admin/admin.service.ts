import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
title:string = "";
  constructor() { }
  setTitle(title:string){
    this.title = title;
  }
}
