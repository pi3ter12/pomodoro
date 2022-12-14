import {createReducer, on} from '@ngrx/store';

import {TimerState} from './timer.model';
import {
  changeAlarmState,
  closeSettings,
  decreaseTime,
  loadState,
  openSettings,
  saveSettings,
  setCurrentStep,
  setSelectedOption,
  setStep,
  start,
  stop
} from "./timer.actions";
import {environment} from "../../../environments/environment";
import {TimerUtil} from "./timer.util";

export const initialState: Readonly<TimerState> = {
  conf: {
    work: environment.timerConf.work,
    longBreak: environment.timerConf.longBreak,
    shortBreak: environment.timerConf.shortBreak
  },
  baseTime: environment.timerConf.work,
  time: environment.timerConf.work,
  timerStartTime: undefined,
  currentOption: "work",
  working: false,
  rounds: environment.timerConf.rounds,
  currentStep: 0,
  steps: TimerUtil.generateSteps(environment.timerConf.rounds),
  playAlarm: false,
  openSettings: false,
  theme: 'work',
  alarmTime: environment.alarmTime
};

export const timerReducer = createReducer(
  {...initialState},
  on(setCurrentStep, (state, {currentStep}) => ({...state, currentStep: currentStep})),
  on(start, (state) => ({...state, working: true, timerStartTime: new Date()})),
  on(stop, (state) => ({...state, working: false, timerStartTime: undefined, baseTime: state.time})),
  on(setStep, (state, {step}) => step != null ? ({...state, currentStep: step.index}) : state),
  on(openSettings, (state) => ({...state, openSettings: true, theme: 'settings', working: false})),
  on(closeSettings, (state) => ({...state, openSettings: false, theme: state.currentOption})),
  on(saveSettings, (state, {newState}) => ({
    ...state,
    conf: {
      work: newState.conf.work,
      shortBreak: newState.conf.shortBreak,
      longBreak: newState.conf.longBreak
    },
    time: newState.conf.work,
    working: false,
    timerStartTime: undefined,
    currentStep: 0,
    currentOption: 'work',
    theme: 'work',
    rounds: newState.rounds,
    openSettings: false,
    steps: TimerUtil.generateSteps(newState.rounds),
    baseTime: newState.conf.work,
    alarmTime: newState.alarmTime
  })),
  on(decreaseTime, (state) => {
    const now = new Date();
    let diff, newTime;
    if (state.timerStartTime != null) {
      diff = TimerUtil.diffInSeconds(now, state.timerStartTime);
      newTime = (state.time > 0) ? ((diff > 0) ? state.baseTime - diff : state.time) : 0;
    } else {
      newTime = state.time;
    }
    return {
      ...state,
      time: newTime,
      lastTimeCheck: state.timerStartTime != null ? state.timerStartTime : new Date()
    }
  }),
  on(changeAlarmState, (state, {isOn}) => ({
    ...state,
    playAlarm: isOn
  })),
  on(loadState, (state, {newState}) => ({
    ...state,
    ...newState,
    baseTime: newState.time,
    lastTimeCheck: undefined,
    working: false,
    openSettings: false
  })),
  on(setSelectedOption, (state, {option, manuallyChanged}) => {
    let newCurrentStep = state.currentStep;
    if (manuallyChanged) {
      newCurrentStep = TimerUtil.getNextCorrectStepInManualChange(option, state);
    }
    return {
      ...state,
      currentOption: option,
      theme: state.openSettings ? 'settings' : option,
      currentStep: newCurrentStep,
      baseTime: TimerUtil.getTimeByOption(option, state),
      time: TimerUtil.getTimeByOption(option, state),
      timerStartTime: new Date()
    }
  })
);
