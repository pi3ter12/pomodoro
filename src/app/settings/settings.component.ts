import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ReplaySubject, takeUntil, tap} from "rxjs";
import {selectSettingConf, selectSettingModalOpen} from "../store/timer/timer.selectors";
import {closeSettings} from "../store/timer/timer.actions";
import {SettingsConf} from "../store/timer/timer.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  isModalOpen = this.store.select(selectSettingModalOpen);

  formGroup = new FormGroup({
    workTime: new FormControl(0,
      Validators.compose([
        Validators.required,
        Validators.min(100),
        Validators.max(6000)
      ])
    ),
    breakTime: new FormControl(0,
      Validators.compose([
        Validators.required,
        Validators.min(100),
        Validators.max(6000)
      ])
    ),
    longBreakTime: new FormControl(0,
      Validators.compose([
        Validators.required,
        Validators.min(100),
        Validators.max(6000)
      ])
    ),
    rounds: new FormControl(0,
      Validators.compose([
        Validators.required,
        Validators.min(2),
        Validators.max(10)
      ])
    ),
  })

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private settingsConf: SettingsConf | undefined;

  private formMap = [
    {key: 'workTime', getValue: () => this.settingsConf?.conf.work || 0},
    {key: 'breakTime', getValue: () => this.settingsConf?.conf.shortBreak || 0},
    {key: 'longBreakTime', getValue: () => this.settingsConf?.conf.longBreak || 0},
    {key: 'rounds', getValue: () => this.settingsConf?.rounds || 0},
  ]

  constructor(private store: Store) { }

  handleCloseButton(): void {
    this.store.dispatch(closeSettings());
  }

  ngOnInit(): void {
    this.store.select(selectSettingConf).pipe(
      takeUntil(this.destroyed$),
      tap(conf => this.settingsConf = conf),
      tap(() => this.updateForm())
    ).subscribe();

    this.formGroup.valueChanges.pipe(
      takeUntil(this.destroyed$),
      tap(currValue => this.updateState({
        conf: {
          work: currValue.workTime,
          shortBreak: currValue.breakTime,
          longBreak: currValue.longBreakTime
        },
        rounds: currValue.rounds
      }))
    ).subscribe()
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public updateState(currentValue: SettingsConf): void {
    console.log('this', currentValue)
    if (this.formGroup.valid) {
      // todo: update state
    } else {
      console.log('form is not valid');
    }
  }

  private updateForm(): void {
    const getValue = (key: string): number =>
      this.formMap.find(item => item.key === key)?.getValue() || 0;

    Object.keys(this.formGroup.controls)
      .forEach(key => this.formGroup.get(key)?.setValue(getValue(key)));
  }
}
