import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReplaySubject, takeUntil, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {selectCurrentOption, selectSettingModalOpen, selectTheme} from "../store/timer/timer.selectors";
import {CurrentOption, Theme} from "../store/timer/timer.model";
import {StateBackupService} from "../shared/service/state-backup.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'work'
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  isSettingModalOpen = this.store.select(selectSettingModalOpen);

  constructor(private store: Store,
              private stateBackupService: StateBackupService) {
  }

  ngOnInit() {
    this.store.select(selectTheme).pipe(
      tap(theme => this.currentTheme = theme),
      takeUntil(this.destroyed$)
    ).subscribe()
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
