import { Component, Input, OnInit } from '@angular/core';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

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
  public filterOptions!: FilterSettingsModel


  ngOnInit(): void {
    this.filterOptions = {
      type: 'Menu'
    }
  }


}
