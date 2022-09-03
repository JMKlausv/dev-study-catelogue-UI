import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterService, GridModule, PageService, SearchService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { HttpClientModule} from '@angular/common/http';
import { MultiSelectModule, CheckBoxSelectionService,DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ApiService } from './api.service';
import { ActionButtonGroupComponent } from './action-button-group/action-button-group.component';
import { AppGridComponent } from './app-grid/app-grid.component';


@NgModule({
  declarations: [
    ActionButtonGroupComponent,
    AppGridComponent
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
    AppGridComponent,
    HttpClientModule
  ]
})
export class SharedModule { }
