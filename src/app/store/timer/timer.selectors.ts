import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TimerState} from "./timer.model";

export const selectTimerState = createFeatureSelector<
  Readonly<TimerState>
  >('timer');

export const selectCurrentStep = createSelector(
  selectTimerState,
  (timer) => timer.currentStep
);

export const getWorkingValue = createSelector(
  selectTimerState,
  (timer) => timer.working
)
export const getTime = createSelector(
  selectTimerState,
  (timer) => timer.time
)
