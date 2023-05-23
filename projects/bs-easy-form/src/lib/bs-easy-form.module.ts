import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BsSharedUtilsModule } from 'BsSharedUtils';
import { DynamicFormComponent } from './components/dynamic-form.component';



@NgModule({
  declarations: [
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    BsSharedUtilsModule
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class BsEasyFormModule { }
