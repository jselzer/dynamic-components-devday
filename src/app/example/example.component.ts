import {Component} from '@angular/core';
import {ModalConfig} from '../modal/modal.config';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent {
  name: string = 'Hey guy';

  constructor(config: ModalConfig) {
    this.name = config.data.name;
  }
}
