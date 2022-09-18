import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterService, GridModule, PageService, ResizeService, SearchService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { MultiSelectModule, CheckBoxSelectionService,DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ApiService } from './api.service';
import { ActionButtonGroupComponent } from './action-button-group/action-button-group.component';
import { AppGridComponent } from './app-grid/app-grid.component';
import { SaveCancelButtonComponent } from './save-cancel-button/save-cancel-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';


@NgModule({
  declarations: [
    ActionButtonGroupComponent,
    AppGridComponent,
    SaveCancelButtonComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    CheckBoxModule,
    MultiSelectModule,
    ReactiveFormsModule,
    DialogModule,
    DropDownListAllModule
  ],
  providers:[
    ApiService,
    ResizeService,
    SearchService,
    ToolbarService,
    FilterService,
     PageService,
     CheckBoxSelectionService
    ],
  exports:[
    AppGridComponent,
    SaveCancelButtonComponent,
    ReactiveFormsModule,
    DialogModule,
    
  ]
})
export class SharedModule { }
