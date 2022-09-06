import {createReducer, on} from '@ngrx/store';

import {TimerState} from './timer.model';
import {
  changeAlarmState,
  decreaseTime,
  loadState,
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
  time: environment.timerConf.work,
  lastTimeCheck: undefined,
  currentOption: "work",
  working: false,
  rounds: environment.timerConf.rounds,
  currentStep: 0,
  steps: TimerUtil.generateSteps(environment.timerConf.rounds),
  playAlarm: false
};

export const timerReducer = createReducer(
  initialState,
  on(setCurrentStep, (state, {currentStep}) => ({...state, currentStep: currentStep})),
  on(start, (state) => ({...state, working: true, lastTimeCheck: new Date()})),
  on(stop, (state) => ({...state, working: false, lastTimeCheck: undefined})),
  on(setStep, (state, {step}) => step != null ? ({...state, currentStep: step.index}) : state),
  on(decreaseTime, (state) => {
    const now = new Date();
    let diff, newTime, lastTimeCheck;
    if (state.lastTimeCheck != null) {
      diff = TimerUtil.diffInSeconds(now, state.lastTimeCheck);
      newTime = (state.time > 0) ? ((diff > 0) ? state.time - diff : state.time) : 0;
      lastTimeCheck = (diff > 0) ? now : state.lastTimeCheck;
    } else {
      newTime = state.time;
      lastTimeCheck = now;
    }
    return {
      ...state,
      time: newTime,
      lastTimeCheck: lastTimeCheck
    }
  }),
  on(changeAlarmState, (state, {isOn}) => ({
    ...state,
    playAlarm: isOn
  })),
  on(loadState, (state, {newState}) => ({
    ...state,
    ...newState,
    lastTimeCheck: undefined
  })),
  on(setSelectedOption, (state, {option, manuallyChanged}) => {
    let newCurrentStep = state.currentStep;
    if (manuallyChanged) {
      newCurrentStep = TimerUtil.getNextCorrectStepInManualChange(option, state);
    }
    return {
      ...state,
      currentOption: option,
      currentStep: newCurrentStep,
      time: TimerUtil.getTimeByOption(option, state)
    }
  })
);
