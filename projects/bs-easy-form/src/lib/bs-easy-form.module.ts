import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BsSharedUtilsModule } from '@babbubba/bs-shared-utils';
import { DynamicDataTableComponent } from './components/dynamic-data-table/dynamic-data-table.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicDataTableComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    BsSharedUtilsModule,
    DataTablesModule,
  ],
  exports: [
    DynamicFormComponent,
    DynamicDataTableComponent
  ],
  providers:[DatePipe]
})
export class BsEasyFormModule { }
