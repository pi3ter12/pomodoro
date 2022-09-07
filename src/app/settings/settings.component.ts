import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ReplaySubject, takeUntil} from "rxjs";
import {selectSettingModalOpen} from "../store/timer/timer.selectors";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  isModalOpen = this.store.select(selectSettingModalOpen);

  constructor(private store: Store) { }

}
