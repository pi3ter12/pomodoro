import {Injectable} from '@angular/core';
import {interval, Subject, Subscription, switchMap, tap} from "rxjs";
import {Store} from '@ngrx/store';
import {getTime, getWorkingValue} from "../../../store/timer/timer.selectors";
import {decreaseTimeByOneSecond} from "../../../store/timer/timer.actions";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private intervalSubscription: Subscription | undefined = undefined;
  private onPlayAlarmSubject: Subject<void> = new Subject<void>();
  public onPlayAlarm = this.onPlayAlarmSubject.asObservable();

  constructor(private store: Store) {
    this.store.select(getWorkingValue)
      .subscribe((working) => {
        working ? this.startSubscription() : this.stopSubscription();
      })
  }

  private startSubscription(): void {
    this.stopSubscription();
    this.intervalSubscription = interval(1000).pipe(
      switchMap(() => this.store.select(getTime)),
      tap((time) => {
        if (time > 0) {
          // this.state.time--;
          this.store.dispatch(decreaseTimeByOneSecond())
          // this.notify();
        } else {
          this.onPlayAlarmSubject.next();
          this.stopSubscription();
          // this.changeOption(true);
        }
      }),
    ).subscribe();
  }

  private stopSubscription(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
