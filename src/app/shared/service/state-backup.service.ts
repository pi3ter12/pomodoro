import {Injectable} from '@angular/core';
import {TimerState} from "../../store/timer/timer.model";
import {Store} from "@ngrx/store";
import {loadState} from "../../store/timer/timer.actions";
import {selectTimerState} from "../../store/timer/timer.selectors";
import {tap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StateBackupService {
  private static readonly LOCAL_STORAGE_KEY = 'POMODORO_CONF';

  constructor(private store: Store) {
    if (environment.saveInLocalStorage) {
      this.loadStateFromLocalStorage();
      this.store.select(selectTimerState)
        .pipe(tap(state => this.saveStateInLocalStorage(state)))
        .subscribe();
    }
  }

  private loadStateFromLocalStorage(): void {
    const value = localStorage.getItem(StateBackupService.LOCAL_STORAGE_KEY);
    if (value != null && value.trim().length > 0) {
      const conf: TimerState = JSON.parse(value);
      this.store.dispatch(loadState({newState: conf}));
    }
  }

  private saveStateInLocalStorage(state: TimerState): void {
    localStorage.setItem(StateBackupService.LOCAL_STORAGE_KEY, JSON.stringify(state));
  }
}
