import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimerService} from "./timer/timer.service";
import {filter, Subscription} from "rxjs";
import {Howl, Howler} from 'howler';
import {environment} from "../../../environments/environment";
import {Store} from '@ngrx/store';
import {changeAlarmState, setSelectedOption} from "../../store/timer/timer.actions";
import {selectPlayAlarm, selectTimerState} from "../../store/timer/timer.selectors";
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
    this.onPlayAlarmSubscription = this.store.select(selectPlayAlarm)
      .pipe(filter(isOn => isOn))
      .subscribe(() => this.playAlarm());
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
        this.store.dispatch(changeAlarmState({isOn: false}))
      }, environment.alarmTime * 1000)
    }
  }
}
