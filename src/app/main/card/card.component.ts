import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrentOption, TimerService, TimerState} from "./timer/timer.service";
import {Subscription} from "rxjs";
import {Howl, Howler} from 'howler';
import {environment} from "../../../environments/environment";
import {Store} from '@ngrx/store';
import {changeOption, start, stop} from "../../store/timer/timer.actions";
import {selectCurrentStep} from "../../store/timer/timer.selectors";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  selectedOption: CurrentOption = 'work';
  seconds: number = 0;
  step: number = 0;
  rounds: number = 0;
  working: boolean = false;
  private stateChangeSubscription: Subscription | undefined;
  private onPlayAlarmSubscription: Subscription | undefined;
  private alarm: Howl | undefined;

  constructor(private timerService: TimerService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.handleStateUpdate(this.timerService.getState());
    this.stateChangeSubscription = this.timerService.onStateChange
      .subscribe((state: TimerState) => this.handleStateUpdate(state));
    this.alarm = this.getSound();
    this.onPlayAlarmSubscription = this.timerService.onPlayAlarm
      .subscribe(() => this.playAlarm());

    this.store.select(selectCurrentStep)
      .subscribe((item) => console.log('item', item))
    this.store.dispatch(changeOption({ next: true }));
    // this.store.dispatch(setCurrentStep({ stepId: 11 }));
    // this.store.dispatch(setCurrentStep({ stepId: 12 }));
    // this.store.dispatch(setCurrentStep({ stepId: 13 }));
  }

  ngOnDestroy() {
    if (this.stateChangeSubscription) {
      this.stateChangeSubscription.unsubscribe();
    }
  }

  public handleOptionChange(state: CurrentOption): void {
    if (this.selectedOption !== state) {
      this.timerService.setSelectedOption(state, true);
    }
  }

  handleWorkingButton(value: boolean): void {
    if (value) {
      this.store.dispatch(start());
    } else {
      this.store.dispatch(stop());
    }
  }

  handleNavClick(isNext: boolean): void {
    this.timerService.changeStep(isNext);
  }

  handleRoundChange(value: number): void {
    this.timerService.changeRound(value);
  }

  private handleStateUpdate(state: TimerState): void {
    this.selectedOption = state.currentOption;
    this.seconds = state.time;
    this.working = state.working;
    this.step = state.currentStep;
    this.rounds = state.rounds;
  }

  private getSound(): Howl {
    const sound = new Howl({
      src: ['assets/sounds/alarm.mp3']
    });
    Howler.volume(1);
    return sound;
  }

  private playAlarm(): void {
    if (this.alarm) {
      const id = this.alarm.play();
      setTimeout(() => {
        this.alarm?.stop(id)
      }, environment.alarmTime * 1000)
    }

    // Change global volume.
  }
}
