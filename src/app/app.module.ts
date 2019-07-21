import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ModalModule} from './modal/modal.module';
import {ExampleComponent} from './example/example.component';
import {MODAL_STYLE_TOKEN, ModalStyle} from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    ModalModule
  ],
  providers: [
    {provide: MODAL_STYLE_TOKEN, useValue: ModalStyle.SLIDE_PANEL}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ExampleComponent
  ]
})
export class AppModule { }
