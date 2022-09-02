import { Injectable } from '@angular/core';
import {interval, Subject, Subscription, takeUntil, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private state: TimerState;
  private intervalSubscription: Subscription | undefined = undefined;
  private onStateChangeSubject: Subject<TimerState> = new Subject<TimerState>();
  public onStateChange = this.onStateChangeSubject.asObservable();

  constructor() {
    this.state = {
      conf: {
        work: 25,//*60,
        longBreak: 15,//*60,
        shortBreak: 5,//*60
      },
      time: 25,//*60,
      currentOption: "work",
      working: false
    }
  }

  public getSelectedOption(): CurrentOption {
    return this.state.currentOption;
  }

  public start() {
    this.state.working = true;
    this.startSubscription();
    this.notify();
  }

  public changeWorking(value: boolean): void {
    this.state.working = value;
    value ? this.startSubscription() : this.stopSubscription();
    this.notify();
  }

  private startSubscription(): void {
    this.intervalSubscription = interval(1000).pipe(
      tap(() => {
        if (this.state.time > 0) {
          this.state.time--;
          this.notify();
        } else {
          this.stopSubscription();
          this.nextOption();
        }
      }),
    ).subscribe();
  }

  private nextOption(): void {
    // todo
    this.setSelectedOption('shortBreak');
    this.startSubscription();
  }

  private stopSubscription(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  public setSelectedOption(option: CurrentOption): void {
    this.state.currentOption = option;
    this.state.time = this.getTimeByOption(option);
    this.notify();
  }

  public getState(): TimerState {
    return this.state;
  }

  private notify(): void {
    this.onStateChangeSubject.next(this.state);
  }

  private getTimeByOption(option: CurrentOption): number {
    const prepareResultList: {option: CurrentOption, time: number}[] = [
      {option: "work", time: this.state.conf.work},
      {option: "longBreak", time: this.state.conf.longBreak},
      {option: "shortBreak", time: this.state.conf.shortBreak},
    ]
    const find = prepareResultList.find(item => item.option === option);
    return (find == null) ? 0 : find.time;
  }
}

export interface TimerState {
  conf: {
    work: number;
    longBreak: number;
    shortBreak: number;
  },
  currentOption: CurrentOption;
  time: number;
  working: boolean;
}
export type CurrentOption =  'work' | 'longBreak' | 'shortBreak';
