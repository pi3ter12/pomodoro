import {createReducer, on} from '@ngrx/store';

import {TimerState} from './timer.model';
import {
  changeAlarmState,
  decreaseTimeByOneSecond,
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
  on(start, (state) => ({...state, working: true})),
  on(stop, (state) => ({...state, working: false})),
  on(setStep, (state, {step}) => step != null ? ({...state, currentStep: step.index}) : state),
  on(decreaseTimeByOneSecond, (state) => ({
    ...state,
    time: (state.time > 0) ? state.time - 1 : 0
  })),
  on(changeAlarmState, (state, {isOn}) => ({
    ...state,
    playAlarm: isOn
  })),
  on(loadState, (state, {newState}) => ({
    ...state,
    ...newState
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
