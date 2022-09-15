import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createSpinner, DialogUtility, hideSpinner, showSpinner } from '@syncfusion/ej2-angular-popups';
import { Observable } from 'rxjs';
import { Framework } from 'src/app/models/framework.interface';
import { Language } from 'src/app/models/language.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-framework-form',
  templateUrl: './framework-form.component.html',
  styleUrls: ['./framework-form.component.css']
})
export class FrameworkFormComponent implements OnInit {

  constructor(private router:Router , private apiService:ApiService) { }
  framework:Framework = this.router.getCurrentNavigation()?.extras.state as Framework;
  title!:string;
  mode!:string;
  languages:Language[]=[];
  fields:Object = {text:"name",value:"id"};
  frameworkForm:FormGroup= new FormGroup({
    id: new FormControl(),///hidden///
    name:new FormControl('',[Validators.required]),
    type:new FormControl('',[Validators.required]),
    languageId:new FormControl('',[Validators.required])
  });
  get name():FormControl{
    return this.frameworkForm.get("name") as FormControl;
  }
  get type():FormControl{
    return this.frameworkForm.get("type") as FormControl;
  }
  get languageId():FormControl{
    return this.frameworkForm.get("languageId") as FormControl;
  }
  ngOnInit(): void {
    if(this.framework == null){
      this.title="Add New Framework";
      this.mode="add";
    }else{
      this.title="Update Framework";
      this.mode="edit";
      this.frameworkForm.patchValue(this.framework);
    }
      this._fetchLanguages();
  }
  ngAfterViewInit(){
    createSpinner({
      target:document.getElementById("container")!
    })
  }

  submit(){
    if(this.frameworkForm.valid){
      showSpinner(document.getElementById("container")!);
      var command : Observable<Object> = this.mode=="add"
      ?this.apiService.post('Framework/',this.frameworkForm.value)
      :this.apiService.edit('Framework/',this.frameworkForm.value);

     command.subscribe({
        next:res=>{
          hideSpinner(document.getElementById("container")!);
          this.router.navigate(['admin/framework']);
        },
        error:error=>{
          hideSpinner(document.getElementById("container")!);
          console.log(error);
          switch(error.status){
            case 400:
             this._openDialogue("Invalid input : Framework name must be unique");break;
            default:
               this._openDialogue("some thing went wrong : please try again");
         }
        }
      })
    }
  }
  cancel(){
    this.router.navigate(['/admin/framework']);
  }
  
  private _fetchLanguages(){
    this.apiService.get("Language").subscribe({
      next:res=>{
        this.languages = res as Language[];
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  _openDialogue(message:string){
    DialogUtility.alert({
      title:"Error",
      content:message,
      position:  { X:'center', Y: 'center' },
      
    });
  
    }
}
