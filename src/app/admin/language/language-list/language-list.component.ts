import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Language } from 'src/app/models/language.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent implements OnInit {
 
  constructor(private apiService:ApiService) { }

  data:Language[]=[];
  columnData : {field:string,headerText:string}[]=[
    {field:'id', headerText: 'Language Id'},
    { field:'name', headerText: 'Language Name'}
  ]

  ngOnInit(): void {
   this.fetchLanguages();
  }


  fetchLanguages(){
    this.apiService.getAll("Language").subscribe(res=>{
      this.data = res as Language[];
      console.log(this.data[0].id)
    })
  }

}
