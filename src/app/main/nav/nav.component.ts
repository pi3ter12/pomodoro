import {Component, Input} from '@angular/core';
import {CurrentOption} from "../card/timer/timer.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() theme: CurrentOption = 'work';
}
