import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameworkListComponent } from './framework-list/framework-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FrameworkFormComponent } from './framework-form/framework-form.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

const routes :Routes = [
  {
    path:'',
    component:FrameworkListComponent
  },
  {
    path:'form',
    component:FrameworkFormComponent
  }
]

@NgModule({
  declarations: [
    FrameworkListComponent,
    FrameworkFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DropDownListModule,
    ButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class FrameworkModule { }
