import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { createSpinner, DialogComponent, DialogUtility, hideSpinner, setSpinner, showSpinner } from '@syncfusion/ej2-angular-popups';
import { Subject } from 'rxjs';
import { Language } from 'src/app/models/language.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.css']
})
export class LanguageFormComponent implements OnInit {
  loading: boolean = false;
  form1 : FormGroup= new FormGroup({
    languageName :new FormControl('',[Validators.required])
  });
  constructor(private apiService:ApiService , private router: Router) { }

get languageName() : FormControl{
  return this.form1.get('languageName') as FormControl
}

  ngOnInit(): void {

  }
  ngAfterViewInit():void{
    this._createSpinner();
  }
  addLanguage(){
   this.loading = true;
   this._showSpinner();
    var newLanguage: Language = {
      name: this.languageName.value
    }
      this.apiService.add('Language/', newLanguage).subscribe(
        res=>{
          this.loading =false;
          this._hideSpinner();
        console.log('..........res.........')
        console.log(res);
     
      },
      error=>{
        this.loading = false;
        this._hideSpinner();
        switch(error.status){
           case 400:
            this._openDialogue("Invalid input : language name must be unique");
        }
        
      }
      )
  }
onCancel(){
  this.router.navigate(['/admin/language']);
}
_createSpinner(){
  createSpinner({
    target: document.getElementById('container')!
  });
}

_showSpinner(){
  showSpinner(document.getElementById('container')!);
}

_hideSpinner(){

    hideSpinner(document.getElementById('container')!);
}
_openDialogue(message:string){
  DialogUtility.alert({
    title:"Error",
    content:message,
    position:  { X:'center', Y: 'center' },
    
  });

  }

}
