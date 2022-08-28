import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageListComponent } from './language-list/language-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes : Routes = [
  {
    path: '',
    children:[
      {
        path:'',
        component: LanguageListComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    LanguageListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LanguageModule { }
