import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EditSettingsModel, FilterSettingsModel, GridComponent, PageSettingsModel, RowDeselectEventArgs, RowSelectEventArgs, SelectionSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  templateUrl: './app-grid.component.html',
  styleUrls: ['./app-grid.component.css']
})
export class AppGridComponent implements OnInit {

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
  public filterOptions!: FilterSettingsModel
  public toolbarOptions!: ToolbarItems[];
  public selectionOptions!: SelectionSettingsModel;
  public selectedRowData!:any;
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

onAdd(event: any){
this.add.emit(event);
}
onEdit(event:any){
  var index :number[]= this.grid.getSelectedRowIndexes();
  if(index.length == 0){
    alert("please select an item to delete");
  }else{
    
    this.edit.emit(this.selectedRowData);
  }

}
onDelete(event:any){
  var index :number[]= this.grid.getSelectedRowIndexes();
  if(index.length == 0){
    alert("please select an item to delete");
  }
  else{
    this.delete.emit(this.selectedRowData.id);
  }
}

rowSelected(args: RowSelectEventArgs) {
this.selectedRowData = args.data;
}

}
