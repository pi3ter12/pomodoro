import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getTime} from "../../../store/timer/timer.selectors";
import {tap} from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  value: { minutes: string, seconds: string } = {
    minutes: '00',
    seconds: '00'
  }

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(getTime).pipe(
      tap((time) => this.prepareValue(time))
    ).subscribe();
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
