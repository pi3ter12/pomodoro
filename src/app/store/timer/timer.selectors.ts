import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TimerState} from "./timer.model";

export const selectTimerState = createFeatureSelector<
  Readonly<TimerState>
  >('timer');

export const selectCurrentStep = createSelector(
  selectTimerState,
  (timer) => timer.currentStep
);
export const selectCurrentOption = createSelector(
  selectTimerState,
  (timer) => timer.currentOption
);

export const selectSteps = createSelector(
  selectTimerState,
  (timer) => timer.steps
)

export const getWorkingValue = createSelector(
  selectTimerState,
  (timer) => timer.working
)
export const getTime = createSelector(
  selectTimerState,
  (timer) => timer.time
)
export const selectPlayAlarm = createSelector(
  selectTimerState,
  (timer) => timer.playAlarm
)
