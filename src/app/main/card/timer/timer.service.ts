import {Injectable} from '@angular/core';
import {interval, Subject, Subscription, tap, zip} from "rxjs";
import {Store} from '@ngrx/store';
import {getTime, getWorkingValue} from "../../../store/timer/timer.selectors";
import {changeOption, decreaseTimeByOneSecond, doTimerInterval, start} from "../../../store/timer/timer.actions";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private intervalSubscription: Subscription | undefined = undefined;

  constructor(private store: Store) {
    this.store.select(getWorkingValue)
      .subscribe((working) => {
        working ? this.startSubscription() : this.stopSubscription();
      })
  }

  private startSubscription(): void {
    this.stopSubscription();
    this.intervalSubscription = interval(1000).pipe(
      tap(() => this.store.dispatch(doTimerInterval()))
    ).subscribe();
  }

  private stopSubscription(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
