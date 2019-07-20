import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './modal.component';
import {ModalService} from './modal.service';
import {InsertionDirective} from './insertion.directive';

@NgModule({
  declarations: [
    ModalComponent,
    InsertionDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent
  ],
  entryComponents: [ModalComponent],
  providers: [
    ModalService
  ]
})
export class ModalModule { }
