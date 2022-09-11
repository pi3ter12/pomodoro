import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getTime} from "../../../store/timer/timer.selectors";
import {ReplaySubject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  value: { minutes: string, seconds: string } = {
    minutes: '00',
    seconds: '00'
  }
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(getTime).pipe(
      tap((time) => this.prepareValue(time)),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private prepareValue(time: number): void {
    const minutes = Math.floor(time / 60);
    const seconds = time - (minutes * 60);
    this.value = {
      minutes: this.formatValue(minutes),
      seconds: this.formatValue(seconds)
    }
  }

  private formatValue(value: number): string {
    return (value < 10) ? '0' + value : '' + value;
  }
}
