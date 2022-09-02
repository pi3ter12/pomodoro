import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private state: TimerState;
  private onStateChangeSubject: Subject<TimerState> = new Subject<TimerState>();
  public onStateChange = this.onStateChangeSubject.asObservable();

  constructor() {
    this.state = {
      conf: {
        work: 25*60,
        longBreak: 15*60,
        shortBreak: 5*60
      },
      time: 25*60,
      currentOption: "work"
    }
  }

  public getSelectedOption(): CurrentOption {
    return this.state.currentOption;
  }

  public setSelectedOption(option: CurrentOption): void {
    this.state.currentOption = option;
    this.state.time = this.getTimeByOption(option);
    this.onStateChangeSubject.next(this.state);
  }

  public getState(): TimerState {
    return this.state;
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
}
export type CurrentOption =  'work' | 'longBreak' | 'shortBreak';
