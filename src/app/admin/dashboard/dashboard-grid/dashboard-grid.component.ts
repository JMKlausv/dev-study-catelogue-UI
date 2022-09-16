import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommandModel, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ColumnData } from 'src/app/models/columnData';
import { Course } from 'src/app/models/course.interface';
import { Framework } from 'src/app/models/framework.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard-grid.component.html',
  styleUrls: ['./dashboard-grid.component.css']
})
export class DashboardGridComponent implements OnInit {

  constructor(private apiService:ApiService) { }
  frameworks : Framework[]=[];
  fields:Object = {text:"name",value:"id"};
  public commands!: CommandModel[];
  public editSettings!: EditSettingsModel;
  
  @Input()
  courseData:Course[]=[];
  @Input()
  columnData!:ColumnData[];
  @Input()
  title!:string;
  @Input()
  isUserCourse!:boolean;
  @Output()
  edit:EventEmitter<any>= new EventEmitter<any>();
  @Output()
  filterChange:EventEmitter<number>= new EventEmitter<number>();

  ngOnInit(): void {
    this._fetchFrameworks();
    this.editSettings = { allowEditing: true, allowDeleting: true };
    this.commands = [{ type:"Edit",buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
    ];
  }


  commandClick(args: any) {
 
      this.edit.emit(args.rowData);
    
  }
  private _fetchFrameworks(){
    this.apiService.get("Framework").subscribe({
      next:res=>{
        this.frameworks = res as Framework[];
      },
      error:error=>{
        console.log(error);
      }
    })
  }
  onFilterFrameworkChange(frameworkId:number){
   this.filterChange.emit(frameworkId);
  }
}
