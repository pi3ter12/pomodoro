import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, of, switchMap, tap, zip} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {changeOption, setCurrentStep, setSelectedOption, setStep} from "./timer.actions";
import {Store} from "@ngrx/store";
import {selectTimerState} from "./timer.selectors";
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
    tap(() => console.log('changeOption$')),
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
    tap(() => console.log('setStep$')),
    switchMap((action) => [
      setCurrentStep({currentStep: action.step?.index || 0}),
      setSelectedOption({option: action.step?.type || 'work', manuallyChanged: false})
    ])
  ));
}
