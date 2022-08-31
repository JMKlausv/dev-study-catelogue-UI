import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageListComponent } from './language-list/language-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LanguageFormComponent } from './language-form/language-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

const routes : Routes = [
  {
    path: '',
    children:[
      {
        path:'',
        component: LanguageListComponent
      },
      {
        path:'new',
        component:LanguageFormComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    LanguageListComponent,
    LanguageFormComponent
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule.forChild(routes)
  ]
})
export class LanguageModule { }
