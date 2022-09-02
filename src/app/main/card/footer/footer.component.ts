import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CurrentOption} from "../timer/timer.service";

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
