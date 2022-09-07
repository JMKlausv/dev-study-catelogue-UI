import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-angular-popups';
import { Subject } from 'rxjs';
import { ColumnData } from 'src/app/models/columnData';
import { Framework } from 'src/app/models/framework.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-framework-list',
  templateUrl: './framework-list.component.html',
  styleUrls: ['./framework-list.component.css']
})
export class FrameworkListComponent implements OnInit {

  constructor(private apiService:ApiService , private router:Router) { }

  framework!:Framework[] ;
  columnData:ColumnData[]=[
    {field:"name",headerText:"Framework Name"},
    {field:"type",headerText:"Framework Type"},
    {field:"language.name",headerText:"Language"}
  ];

  ngOnInit(): void {
    this.apiService.get('Framework').subscribe({
      next:res=>{
         this.framework = res as Framework[];
      },
      error:error=>{

      }
    })
  }
  ngAfterViewInit(){
    createSpinner({
      target:document.getElementById("container")!
    })
  }

  deleteFramework(selectedItemId:number){

    if(window.confirm("Are you sure you want to delete the selected framework?")){
      showSpinner(document.getElementById("container")!);
      this.apiService.delete("Framework/"+selectedItemId).subscribe({
        next:res=>{
          hideSpinner(document.getElementById("container")!);
          this.ngOnInit();    
        },
        error:error=>{
          console.log(error.message)
          hideSpinner(document.getElementById('container')!);
        }
       })
    }
  }

  addFramework(){
    this.router.navigate(['/admin/framework/form']);
  }
  editFramework(framework:Framework){
    this.router.navigate(['/admin/framework/form'],{state:framework});
  }
}
