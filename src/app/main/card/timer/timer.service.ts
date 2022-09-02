import {Injectable} from '@angular/core';
import {interval, Subject, Subscription, tap} from "rxjs";
import {environment} from "../../../../environments/environment";

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
        work: environment.timerConf.work,
        longBreak: environment.timerConf.longBreak,
        shortBreak: environment.timerConf.shortBreak
      },
      time: environment.timerConf.work,
      currentOption: "work",
      working: false,
      rounds: environment.timerConf.rounds,
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
          this.changeOption(true);
        }
      }),
    ).subscribe();
  }

  public changeStep(next: boolean) {
    this.stopSubscription();
    this.changeOption(next)
  }

  private changeOption(next: boolean = true): void {
    const prevOrNextStep = (next) ? this.state.currentStep + 1 : this.state.currentStep - 1;
    let step = this.steps.find(item => item.index === prevOrNextStep);
    let newStep = prevOrNextStep;
    if (step == null) {
      newStep = (next) ? 0 : this.steps.length - 1;
      step = this.steps.find(item => item.index === newStep);
    }
    if (step != null) {
      this.state.currentStep = newStep;
      this.setSelectedOption(step.type, false);
      this.startSubscription();
    }
  }

  private stopSubscription(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  public setSelectedOption(option: CurrentOption, manuallyChanged: boolean): void {
    this.state.currentOption = option;
    if (manuallyChanged) {
      this.state.currentStep = this.getNextCorrectStepInManualChange(option)
    }
    this.state.time = this.getTimeByOption(option);
    this.notify();
  }

  getNextCorrectStepInManualChange(option: CurrentOption): number {
    const searchStep = (searchOption: CurrentOption, startIndex: number): number | undefined => {
      for (let i = startIndex; i < this.steps.length; i++) {
        const foundStep = this.steps?.find((item) => item.index === i)
        if (foundStep == null) {
          return undefined;
        }
        if (foundStep.type === searchOption) {
          return foundStep.index
        }
      }
      return undefined;
    }
    if (option !== this.steps?.find(item => item.index === this.state.currentStep)?.type) {
      let searchResult = searchStep(option, this.state.currentStep);
      if (searchResult == null) {
        searchResult = searchStep(option, 0);
      }
      return searchResult || 0;
    }
    return 0;
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
