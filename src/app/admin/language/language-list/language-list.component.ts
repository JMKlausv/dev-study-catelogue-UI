import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-angular-popups';
import { map } from 'rxjs';
import { ColumnData } from 'src/app/models/columnData';
import { Language } from 'src/app/models/language.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent implements OnInit {
 
  constructor(private apiService:ApiService ,  private router:Router) { }

  data:Language[]=[];
  columnData : ColumnData[]=[
    {field:'id', headerText: 'Language Id'},
    { field:'name', headerText: 'Language Name'}
  ]

  ngOnInit(): void {
   this.fetchLanguages();
  }
  
  ngAfterViewInit(){
    createSpinner({
      target: document.getElementById('container')!
    });
  }

  fetchLanguages(){
    this.apiService.get("Language").subscribe(res=>{
      this.data = res as Language[];
    })
  }
  addLanguage(){
    this.router.navigate(['/admin/language/form']);
  }
  editLanguage(language:any){
    
    this.router.navigate(['/admin/language/form'],{state:language});
  }
  deleteLanguage(id:number){

    

    if(window.confirm("Are You want to delete the selected language")){
      showSpinner(document.getElementById('container')!);
      this.apiService.delete("Language/"+id).subscribe(
        res=>{
        this.ngOnInit();

        hideSpinner(document.getElementById('container')!);
      },
      error=>{
        console.log(error.message)
        hideSpinner(document.getElementById('container')!);
      }
      );
    }
  }

}
