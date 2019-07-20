import { Component } from '@angular/core';
import {ModalService} from './modal/modal.service';
import {ExampleComponent} from './example/example.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private modalService: ModalService) { }

  openModal() {
    this.modalService.open(ExampleComponent);
  }
}
