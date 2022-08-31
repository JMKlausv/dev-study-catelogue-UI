import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommandModel, EditSettingsModel, FilterSettingsModel, PageSettingsModel, SelectionSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor() { }
  @Input()
  data:any;
  @Input()
  columnData!: {field:string,headerText:string}[];
  @Output()
  add:EventEmitter<any> = new EventEmitter<any>();
  @Output()
  delete: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  edit:EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('grid') 
  public grid! : GridComponent ;
  public editSettings!: EditSettingsModel;
  public pageSettings!: PageSettingsModel;
  public commands!: CommandModel[];
  public filterOptions!: FilterSettingsModel
  public toolbarOptions!: ToolbarItems[];
  public selectionOptions!: SelectionSettingsModel;
  
  ngOnInit(): void {
    this.filterOptions = {
      type: 'Menu'
    }
    this.toolbarOptions = ['Search']
    this.pageSettings = { pageSize: 6 };

    this.editSettings = { allowEditing: true, allowDeleting: true };
    this.selectionOptions = { 
      type: 'Single', 
      persistSelection: true ,
     
    };

  }

  // onCommandClick(args: any) {
  //   if (args.target.title == 'Delete') {
  //     this.delete.emit(args.rowData);
  //   } else if (args.target.title == 'Edit') {
  //     this.edit.emit(args.rowData);
  //   }
  // }
onAdd(event: any){
this.add.emit(event);
}
onUpdate(){

}
onDelete(){

}
}
