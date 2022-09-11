import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {map, take} from "rxjs";
import {selectSettingModalOpen} from "../../../store/timer/timer.selectors";
import {closeSettings, openSettings} from "../../../store/timer/timer.actions";

@Component({
  selector: 'app-settings-button',
  templateUrl: './settings-button.component.html',
  styleUrls: ['./settings-button.component.scss']
})
export class SettingsButtonComponent {
  constructor(private store: Store) {
  }

  handleSettingButtonClick(): void {
    this.store.select(selectSettingModalOpen).pipe(
      take(1),
      map((isOpen: boolean) => isOpen ? closeSettings() : openSettings())
    ).subscribe((action) => this.store.dispatch(action));
  }
}
