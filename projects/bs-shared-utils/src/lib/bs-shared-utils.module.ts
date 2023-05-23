import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ConfirmModalComponent, MessageModalComponent, CheckBoxComponent } from '../public-api';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    CheckBoxComponent,
    MessageModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forChild()
  ],
  exports: [
    CheckBoxComponent,
    MessageModalComponent,
    ConfirmModalComponent
  ]
})
export class BsSharedUtilsModule { }
