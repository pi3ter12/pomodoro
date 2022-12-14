import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimerService} from "./timer/timer.service";
import {filter, ReplaySubject, switchMap, take, takeUntil} from "rxjs";
import {Howl, Howler} from 'howler';
import {Store} from '@ngrx/store';
import {changeAlarmState, setSelectedOption} from "../../store/timer/timer.actions";
import {selectAlarmTime, selectCurrentOption, selectPlayAlarm} from "../../store/timer/timer.selectors";
import {CurrentOption} from "../../store/timer/timer.model";

@Component({
  selector: 'app-timer-card-content',
  templateUrl: './timer-card-content.component.html',
  styleUrls: ['./timer-card-content.component.scss']
})
export class TimerCardContentComponent implements OnInit, OnDestroy {
  currentOption: CurrentOption = 'work';
  private alarm: Howl | undefined;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private timerService: TimerService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectCurrentOption)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((currentOption: CurrentOption) => this.currentOption = currentOption);

    this.alarm = this.getSound();
    this.store.select(selectPlayAlarm).pipe(
      takeUntil(this.destroyed$),
      filter(isOn => isOn),
      switchMap(() => this.store.select(selectAlarmTime).pipe(take(1)))
    ).subscribe((alarmTime) => this.playAlarm(alarmTime));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public handleOptionChange(option: CurrentOption): void {
    if (this.currentOption !== option) {
      this.store.dispatch(setSelectedOption({option, manuallyChanged: true}));
    }
  }

  private getSound(): Howl {
    const sound = new Howl({
      src: ['assets/sounds/alarm.mp3']
    });
    Howler.volume(1);
    return sound;
  }

  private playAlarm(alarmTime: number): void {
    if (this.alarm) {
      const id = this.alarm.play();
      setTimeout(() => {
        this.alarm?.stop(id)
        this.store.dispatch(changeAlarmState({isOn: false}))
      }, alarmTime * 1000)
    }
  }
}
