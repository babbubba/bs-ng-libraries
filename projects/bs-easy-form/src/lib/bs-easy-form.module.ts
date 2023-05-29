import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BsSharedUtilsModule } from '@babbubba/bs-shared-utils';
import { DynamicDataTableComponent } from './components/dynamic-data-table/dynamic-data-table.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicDataTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    BsSharedUtilsModule,
    DataTablesModule
  ],
  exports: [
    DynamicFormComponent,
    DynamicDataTableComponent
  ]
})
export class BsEasyFormModule { }
