import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimerService} from "./timer/timer.service";
import {Subscription} from "rxjs";
import {Howl, Howler} from 'howler';
import {environment} from "../../../environments/environment";
import {Store} from '@ngrx/store';
import {changeOption, changeRound, setSelectedOption, start, stop} from "../../store/timer/timer.actions";
import {selectTimerState} from "../../store/timer/timer.selectors";
import {CurrentOption, TimerState} from "../../store/timer/timer.model";

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
    this.stateChangeSubscription = this.store.select(selectTimerState)
      .subscribe((state: TimerState) => this.handleStateUpdate(state));

    this.alarm = this.getSound();
    this.onPlayAlarmSubscription = this.timerService.onPlayAlarm
      .subscribe(() => this.playAlarm());

    //todo: remove this
    this.store.select(selectTimerState)
      .subscribe((state) => console.log('stateChanged', state));
  }

  ngOnDestroy() {
    if (this.stateChangeSubscription) {
      this.stateChangeSubscription.unsubscribe();
    }
  }

  public handleOptionChange(option: CurrentOption): void {
    if (this.selectedOption !== option) {
      this.store.dispatch(setSelectedOption({option, manuallyChanged: true}));
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
    this.store.dispatch(changeOption({next: isNext}))
  }

  handleRoundChange(value: number): void {
    this.store.dispatch(changeRound({round: value}))
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
  }
}
