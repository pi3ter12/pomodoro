import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CurrentOption} from "../timer/timer.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnChanges {
  @Input() currentOption: CurrentOption = "work";
  @Input() step: number = 0;

  round: number = 1;

  ngOnChanges(changes: SimpleChanges) {
    this.round = Math.floor((this.step) / 2) + 1;
  }
}
