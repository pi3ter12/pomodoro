import {Component, Input} from '@angular/core';
import {CurrentOption} from "../../../store/timer/timer.model";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() currentOption: CurrentOption = "work";
  @Input() step: number = 0;

  constructor() {
  }
}
