import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, of, switchMap, take, zip} from 'rxjs';
import {
  changeAlarmState,
  changeOption,
  changeRound,
  decreaseTime,
  doTimerInterval, saveSettings,
  setCurrentStep,
  setSelectedOption,
  setStep
} from "./timer.actions";
import {Store} from "@ngrx/store";
import {getTime, selectSteps, selectTimerState} from "./timer.selectors";
import {Step} from "./timer.model";

@Injectable()
export class TimerEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
  ) {
  }

  changeOption$ = createEffect(() => this.actions$.pipe(
    ofType(changeOption),
    switchMap((action) => zip(this.store.select(selectTimerState), of(action))),
    map(([state, action]): Step | undefined => {
      const prevOrNextStep = (action.next) ? state.currentStep + 1 : state.currentStep - 1;
      let step: Step | undefined = state.steps.find(item => item.index === prevOrNextStep);
      let newStep = prevOrNextStep;
      if (step == null) {
        newStep = (action.next) ? 0 : state.steps.length - 1;
        step = state.steps.find(item => item.index === newStep);
      }
      return step;
    }),
    map((step: Step | undefined) => setStep({step: step})),
  ));

  setStep$ = createEffect(() => this.actions$.pipe(
    ofType(setStep),
    filter((step) => step != null),
    switchMap((action) => [
      setCurrentStep({currentStep: action.step?.index || 0}),
      setSelectedOption({option: action.step?.type || 'work', manuallyChanged: false})
    ])
  ));

  changeRound$ = createEffect(() => this.actions$.pipe(
    ofType(changeRound),
    switchMap((action) => zip(this.store.select(selectSteps), of(action))),
    map(([steps, action]) => {
      return steps.filter(item => item.type === 'work')
        .sort((a, b) => a.index > b.index ? 1 : -1)[action.round - 1];
    }),
    filter(step => step != null),
    map(step => setStep({step}))
  ))

  doTimerInterval$ = createEffect(() => this.actions$.pipe(
    ofType(doTimerInterval),
    switchMap(() => this.store.select(getTime).pipe(take(1))),
    switchMap((time) => {
      if (time > 0) {
        return [decreaseTime()];
      } else {
        return [
          changeOption({next: true}),
          changeAlarmState({isOn: true})
        ];
      }
    })
  ))
}
