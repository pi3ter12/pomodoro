import {Injectable} from '@angular/core';
import {interval, Subject, Subscription, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private state: TimerState;
  private intervalSubscription: Subscription | undefined = undefined;
  private onStateChangeSubject: Subject<TimerState> = new Subject<TimerState>();
  public onStateChange = this.onStateChangeSubject.asObservable();

  private steps: Round[] = [];

  constructor() {
    this.state = {
      conf: {
        work: 5,//25*60,
        longBreak: 3,//15*60,
        shortBreak: 2,//5*60
      },
      time: 5,//25*60,
      currentOption: "work",
      working: false,
      rounds: 4,
      currentStep: 0
    }
    this.generateSteps();
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

  private generateSteps(): void {
    this.steps = [];
    let index = 0;
    for (let i = 0; i < this.state.rounds; i++) {
      this.steps.push({index: index, type: "work"})
      this.steps.push({index: index + 1, type: (i === this.state.rounds - 1) ? 'longBreak' : 'shortBreak'})
      index += 2;
    }
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
    let step = this.steps.find(item => item.index === this.state.currentStep + 1);
    let newStep = this.state.currentStep + 1;
    if (step == null) {
      step = this.steps.find(item => item.index === 0);
      newStep = 0;
    }
    if (step != null) {
      this.state.currentStep = newStep;
      this.setSelectedOption(step.type);
      this.startSubscription();
    }
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
    const prepareResultList: { option: CurrentOption, time: number }[] = [
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
  rounds: number
  currentStep: number;
}

export type CurrentOption = 'work' | 'longBreak' | 'shortBreak';

export interface Round {
  index: number;
  type: CurrentOption;
}
