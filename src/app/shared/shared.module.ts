import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { FilterService, GridModule, PageService, SearchService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { HttpClientModule} from '@angular/common/http';
import { MultiSelectModule, CheckBoxSelectionService,DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ApiService } from './api.service';


@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    HttpClientModule,
    CheckBoxModule,
    MultiSelectModule,
    DropDownListAllModule
  ],
  providers:[
    ApiService,
    SearchService,
    ToolbarService,
    FilterService,
     PageService,
     CheckBoxSelectionService
    ],
  exports:[
    GridComponent,
  ]
})
export class SharedModule { }
