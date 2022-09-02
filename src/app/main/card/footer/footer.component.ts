import {Component, Input, OnInit} from '@angular/core';
import {CurrentOption} from "../timer/timer.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() currentOption: CurrentOption = "work";
}
