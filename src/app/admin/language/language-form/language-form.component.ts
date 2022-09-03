import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { createSpinner, DialogComponent, DialogUtility, hideSpinner, setSpinner, showSpinner } from '@syncfusion/ej2-angular-popups';
import { Observable } from 'rxjs';
import { Language } from 'src/app/models/language.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.css']
})
export class LanguageFormComponent implements OnInit {
  language:Language = this.router.getCurrentNavigation()?.extras.state as Language;
  public title!:String;
  loading: boolean = false;
  form1 : FormGroup= new FormGroup({
    name :new FormControl('',[Validators.required])
  });
  constructor(private apiService:ApiService , private router: Router ) {
  
   }

get name() : FormControl{
  return this.form1.get('name') as FormControl
}

  ngOnInit(): void {
   
    if(this.language){
      this.form1.patchValue(this.language);
      this.title = "Updage Language";
    }else{
      this.title = "Add New Language "
    }
  }
  ngAfterViewInit():void{
    this._createSpinner();
  
  }
  save(){
   this.loading = true;
   this._showSpinner();
   var command : Observable<Object>;
   if(this.title == "Updage Language"){

    command = this.apiService.edit('Language/', this.form1.value);
   }else{
command = this.apiService.add('Language/', this.form1.value)
   }
      command.subscribe(
        res=>{
          this.loading =false;
          this._hideSpinner();
          this.router.navigate(['/admin/language']);
      },
      error=>{
        this.loading = false;
        this._hideSpinner();
        switch(error.status){
           case 400:
            this._openDialogue("Invalid input : language name must be unique");break;
           default:
              this._openDialogue("some thing went wrong : please try again");
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
