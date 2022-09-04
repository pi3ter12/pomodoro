import {Component, OnInit} from '@angular/core';
import {ControlPanelConf} from "../../../store/timer/timer.model";
import {Store} from "@ngrx/store";
import {selectControlPanelConf} from "../../../store/timer/timer.selectors";
import {tap} from "rxjs";
import {changeOption, changeRound, start, stop} from "../../../store/timer/timer.actions";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  conf: ControlPanelConf | undefined;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectControlPanelConf)
      .pipe(tap(conf => this.conf = conf))
      .subscribe();
  }

  handleStart(): void {
    this.store.dispatch(start());
  }

  handleStop(): void {
    this.store.dispatch(stop());
  }

  handleNavClick(next: boolean): void {
    this.store.dispatch(changeOption({next}))
  }

  handleRoundChange(value: number): void {
    this.store.dispatch(changeRound({round: value}))
  }
}
