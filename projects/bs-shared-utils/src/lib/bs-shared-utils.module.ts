import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ConfirmModalComponent, MessageModalComponent, CheckBoxComponent } from '../public-api';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    CheckBoxComponent,
    MessageModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forChild(),
    DataTablesModule
  ],
  exports: [
    CheckBoxComponent,
    MessageModalComponent,
    ConfirmModalComponent
  ]
})
export class BsSharedUtilsModule { }
