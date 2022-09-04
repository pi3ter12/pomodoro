import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectPlayAlarm} from "../../../store/timer/timer.selectors";

@Component({
  selector: 'app-bell',
  templateUrl: './bell.component.html',
  styleUrls: ['./bell.component.scss']
})
export class BellComponent {
  playAlarm = this.store.select(selectPlayAlarm);

  constructor(private store: Store) {
  }
}
