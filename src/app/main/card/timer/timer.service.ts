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

  public setSelectedOption(state: CurrentOption): void {
    this.state.currentOption = state;
    this.onStateChangeSubject.next(this.state);
  }

  public getState(): TimerState {
    return this.state;
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
