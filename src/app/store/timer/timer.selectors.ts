import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ControlPanelConf, FooterConf, SettingsConf, TimerState} from "./timer.model";

export const selectTimerState = createFeatureSelector<Readonly<TimerState>>('timer');

export const selectCurrentOption = createSelector(
  selectTimerState,
  (timer) => timer.currentOption
);

export const selectTheme = createSelector(
  selectTimerState,
  (timer) => timer.theme
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
export const selectAlarmTime = createSelector(
  selectTimerState,
  (timer) => timer.alarmTime
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
export const selectSettingConf = createSelector(
  selectTimerState,
  ({conf, rounds, alarmTime}): SettingsConf => ({conf, rounds, alarmTime})
)

export const selectSettingModalOpen = createSelector(
  selectTimerState,
  (timer) => timer.openSettings
)
