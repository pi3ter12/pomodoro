import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ControlPanelConf, FooterConf, TimerState} from "./timer.model";

export const selectTimerState = createFeatureSelector<Readonly<TimerState>>('timer');

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

export const selectControlPanelConf = createSelector(
  selectTimerState,
  (timer): ControlPanelConf => ({
    working: timer.working,
    rounds: timer.rounds,
    currentStep: timer.currentStep,
    currentOption: timer.currentOption,
  })
)
export const selectFooterConf = createSelector(
  selectTimerState,
  (timer): FooterConf => ({
    currentStep: timer.currentStep,
    currentOption: timer.currentOption,
  })
)
